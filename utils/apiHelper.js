/**
 * Helper function to wait for a successful (status 200) API response.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} urlSubstring - A unique part of the API endpoint URL to match.
 * @param {Function} triggerAction - An async function that triggers the API call (e.g., clicking a submit button).
 * @returns {Promise<import('@playwright/test').Response>} - The successful response object.
 */
export async function waitForSuccessfulResponse(page, urlSubstring, triggerAction) {
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes(urlSubstring) && response.status() === 200,
    { timeout: 30000 } // 30 seconds timeout
  );
  
  await triggerAction();
  
  return await responsePromise;
}
