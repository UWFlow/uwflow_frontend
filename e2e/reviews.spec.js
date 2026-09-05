const { test, expect } = require('./support/fixtures');
const flow = require('./support/flows');
const backend = require('./backend.cjs');

test('logged-out review action asks the visitor to log in', async ({
  page,
  course,
}) => {
  await page.goto(`/course/${course.code}`);
  await page
    .getByRole('button', { name: 'Add your review', exact: true })
    .click();
  await expect(
    flow.dialog(page).getByPlaceholder('Email', { exact: true }),
  ).toBeVisible();
  await expect(flow.commentBox(page)).toHaveCount(0);
});

test('post requires ratings; cancelling an edit preserves the saved review', async ({
  page,
  registeredAccount,
  course,
}) => {
  await backend.markCourseTaken(registeredAccount.user_id, course.id);
  const auth = await flow.login(page, registeredAccount, course);
  const comment = `E2E persisted review ${registeredAccount.email}`;
  await flow.openReview(page);
  await flow.commentBox(page).fill(comment);
  await expect(flow.postButton(page)).toBeDisabled();
  await flow.fillReview(page, comment);
  const saved = await flow.saveReview(page, auth, course, comment);
  await flow.openReview(page, true);
  await expect(flow.commentBox(page)).toHaveValue(comment);
  await flow.commentBox(page).fill('This edit should never be saved.');
  await flow
    .dialog(page)
    .getByRole('button', { name: 'Cancel', exact: true })
    .click();
  await expect(flow.dialog(page)).toHaveCount(0);
  await page.reload();
  await expect(page.getByText(comment, { exact: true })).toBeVisible();
  expect(await backend.reviews(auth.user_id, course.id, auth.token)).toEqual([
    saved,
  ]);
});
