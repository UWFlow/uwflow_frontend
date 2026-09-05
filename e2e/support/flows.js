const { expect, test } = require('@playwright/test');
const backend = require('../backend.cjs');

const dialog = (page) => page.getByRole('dialog');
const postButton = (page) =>
  dialog(page).getByRole('button', { name: 'Post', exact: true });
const commentBox = (page) =>
  dialog(page).getByPlaceholder('Add any comments or tips...').first();

async function checkpoint(page, name) {
  await test.step(`Inspect: ${name}`, async () => {
    if (process.env.E2E_PAUSE === '1') await page.pause();
  });
}

async function openLogin(page, course) {
  await page.goto(`/course/${course.code}`);
  await page.getByText('Log in', { exact: true }).click();
  await expect(
    dialog(page).getByPlaceholder('Email', { exact: true }),
  ).toBeVisible();
}

async function fillLogin(page, account, password = account.password) {
  await dialog(page)
    .getByPlaceholder('Email', { exact: true })
    .fill(account.email);
  await dialog(page)
    .getByPlaceholder('Password', { exact: true })
    .fill(password);
}

async function signUp(page, account, course) {
  await openLogin(page, course);
  await dialog(page).getByText('Sign up', { exact: true }).click();
  await dialog(page).getByPlaceholder('First Name').fill(account.firstName);
  await dialog(page).getByPlaceholder('Last Name').fill(account.lastName);
  await fillLogin(page, account);
  await dialog(page)
    .getByPlaceholder('Confirm Password')
    .fill(account.password);
  await checkpoint(page, 'filled signup form');
  const responsePromise = page.waitForResponse(
    (r) =>
      r.url().endsWith('/auth/email/register') &&
      r.request().method() === 'POST',
  );
  await dialog(page)
    .getByRole('button', { name: 'Sign Up', exact: true })
    .click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  const auth = await response.json();
  expect(auth.is_new).toBe(true);
  await expect(page).toHaveURL(/\/welcome/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('user_id')))
    .toBe(String(auth.user_id));
  await checkpoint(page, 'new account on welcome page');
  return auth;
}

async function login(page, account, course) {
  await openLogin(page, course);
  await fillLogin(page, account);
  const responsePromise = page.waitForResponse(
    (r) =>
      r.url().endsWith('/auth/email/login') && r.request().method() === 'POST',
  );
  // Submit through the form (also covers keyboard submission).
  await dialog(page)
    .getByPlaceholder('Password', { exact: true })
    .press('Enter');
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  const auth = await response.json();
  await expect(dialog(page)).toHaveCount(0);
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('user_id')))
    .toBe(String(auth.user_id));
  await expect(page.getByText('Log in', { exact: true })).toHaveCount(0);
  return auth;
}

async function logout(page) {
  // Legacy navbar control has no accessible name. Its empty-text chevron
  // distinguishes it from the labeled course dropdowns; kept in one place.
  await page
    .locator('button')
    .filter({ has: page.locator('svg.feather-chevron-down') })
    .filter({ hasText: /^$/ })
    .click();
  await page.getByText('Log out', { exact: true }).click();
  await expect(page.getByText('Log in', { exact: true })).toBeVisible();
  await page.reload();
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  await expect(page.getByText('Log in', { exact: true })).toBeVisible();
}

async function openReview(page, edit = false) {
  // Begin with a fresh page/cache so professor loading cannot overwrite input
  // midway through the test, and this helper also works on repeated opens.
  await page.reload();
  const ready = page.waitForResponse(
    (r) =>
      r.request().method() === 'POST' &&
      r.url().endsWith('/graphql') &&
      r.request().postDataJSON()?.operationName === 'courseReviewProfs',
  );
  await page
    .getByRole('button', {
      name: edit ? 'Edit your review' : 'Add your review',
      exact: true,
    })
    .click();
  const response = await ready;
  expect(response.ok()).toBeTruthy();
  expect((await response.json()).errors).toBeUndefined();
  await expect(commentBox(page)).toBeVisible();
}

async function fillReview(page, comment) {
  await expect(postButton(page)).toBeDisabled();
  // The existing custom sliders expose neither roles nor names. Clicking
  // their handles selects rating 0; avoid pixel coordinates or forced clicks.
  await dialog(page).locator('.slider-handles > div').nth(0).click();
  await dialog(page).locator('.slider-handles > div').nth(1).click();
  // Only the circular control, the label's preceding sibling, is clickable.
  await dialog(page)
    .getByText('Yes', { exact: true })
    .locator('..')
    .locator(':scope > div')
    .first()
    .click();
  await commentBox(page).fill(comment);
  await expect(postButton(page)).toBeEnabled();
}

async function saveReview(page, auth, course, comment, isEdit = false) {
  const responsePromise = page.waitForResponse((r) => {
    if (r.request().method() !== 'POST' || !r.url().endsWith('/graphql'))
      return false;
    return r.request().postDataJSON()?.operationName === 'upsertReview';
  });
  await postButton(page).click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.errors).toBeUndefined();
  expect(body.data.insert_review.returning).toHaveLength(1);
  await expect(
    page.getByText(isEdit ? 'Your review has been updated.' : 'Posted! 🎉', {
      exact: true,
    }),
  ).toBeVisible();
  await expect(dialog(page)).toHaveCount(0);
  await page.reload();
  await expect(page.getByText(comment, { exact: true })).toBeVisible();
  const rows = await backend.reviews(auth.user_id, course.id, auth.token);
  expect(rows).toHaveLength(1);
  expect(rows[0]).toMatchObject({
    course_comment: comment,
    course_easy: 0,
    course_useful: 0,
    liked: 1,
    public: false,
  });
  return rows[0];
}

module.exports = {
  dialog,
  postButton,
  commentBox,
  checkpoint,
  openLogin,
  fillLogin,
  signUp,
  login,
  logout,
  openReview,
  fillReview,
  saveReview,
};
