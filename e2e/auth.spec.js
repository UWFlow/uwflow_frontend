const { test, expect } = require('./support/fixtures');
const flow = require('./support/flows');

test('login succeeds, persists after reload, and logout clears the session', async ({
  page,
  registeredAccount,
  course,
}) => {
  const auth = await flow.login(page, registeredAccount, course);
  expect(auth.user_id).toBe(registeredAccount.user_id);
  await flow.logout(page);
});

test('wrong password shows an error and leaves the visitor logged out', async ({
  page,
  registeredAccount,
  course,
}) => {
  await flow.openLogin(page, course);
  await flow.fillLogin(page, registeredAccount, 'This-is-the-wrong-password!');
  await flow
    .dialog(page)
    .getByPlaceholder('Password', { exact: true })
    .press('Enter');
  await expect(
    flow.dialog(page).getByText('Invalid password.', { exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});

test('signup validates missing names and mismatched passwords without registering', async ({
  page,
  course,
}) => {
  await flow.openLogin(page, course);
  await flow.dialog(page).getByText('Sign up', { exact: true }).click();
  await flow
    .dialog(page)
    .getByRole('button', { name: 'Sign Up', exact: true })
    .click();
  await expect(
    page.getByText('Please enter a first name.', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Please enter a last name.', { exact: true }),
  ).toBeVisible();
  await flow
    .dialog(page)
    .getByPlaceholder('Password', { exact: true })
    .fill('A-valid-password!');
  await flow
    .dialog(page)
    .getByPlaceholder('Confirm Password')
    .fill('Different-password!');
  await flow
    .dialog(page)
    .getByRole('button', { name: 'Sign Up', exact: true })
    .click();
  await expect(
    page.getByText("Passwords don't match.", { exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});

test('duplicate signup reports the existing email without replacing the account', async ({
  page,
  registeredAccount,
  course,
}) => {
  await flow.openLogin(page, course);
  await flow.dialog(page).getByText('Sign up', { exact: true }).click();
  await flow.dialog(page).getByPlaceholder('First Name').fill('Duplicate');
  await flow.dialog(page).getByPlaceholder('Last Name').fill('Account');
  await flow.fillLogin(page, registeredAccount);
  await flow
    .dialog(page)
    .getByPlaceholder('Confirm Password')
    .fill(registeredAccount.password);
  await flow
    .dialog(page)
    .getByRole('button', { name: 'Sign Up', exact: true })
    .click();
  await expect(
    page.getByText('That email has already been registered.', { exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});
