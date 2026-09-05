const { test, expect } = require('./support/fixtures');
const flow = require('./support/flows');
const backend = require('./backend.cjs');

test('walkthrough: create account → log out → log in → post → edit review', async ({
  page,
  account,
  course,
}) => {
  let auth;
  await test.step('Create an account through the signup form', async () => {
    auth = await flow.signUp(page, account, course);
  });
  await test.step('Fixture: add the course to this new account’s history', async () => {
    await backend.markCourseTaken(auth.user_id, course.id);
    await page.goto(`/course/${course.code}`);
  });
  await test.step('Log out and verify the session stays cleared after reload', async () => {
    await flow.logout(page);
    await flow.checkpoint(page, 'logged-out course page');
  });
  await test.step('Log back in with the account just created', async () => {
    const loggedIn = await flow.login(page, account, course);
    expect(loggedIn.user_id).toBe(auth.user_id);
    auth = loggedIn;
    await flow.checkpoint(page, 'logged-in course page after reload');
  });
  const original = `E2E original review ${account.email}`;
  const edited = `E2E updated review ${account.email}`;
  let review;
  await test.step('Post an anonymous review and verify persistence', async () => {
    await flow.openReview(page);
    await flow.fillReview(page, original);
    await flow.checkpoint(page, 'filled review form before posting');
    review = await flow.saveReview(page, auth, course, original);
    await flow.checkpoint(page, 'posted review after reload');
  });
  await test.step('Edit the existing review without creating a duplicate', async () => {
    await flow.openReview(page, true);
    await expect(flow.commentBox(page)).toHaveValue(original);
    await flow.commentBox(page).fill(edited);
    await flow.checkpoint(page, 'edited review before saving');
    const updated = await flow.saveReview(page, auth, course, edited, true);
    expect(updated.id).toBe(review.id);
    await expect(page.getByText(original, { exact: true })).toHaveCount(0);
    await flow.checkpoint(
      page,
      'updated review after reload; resume to clean up',
    );
  });
});
