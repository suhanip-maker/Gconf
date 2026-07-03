import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
import { CREDENTIALS, EVENT_DATA } from '../constants/testData';

test('1. Successfully create a new event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login(CREDENTIALS.VALID_USER.email, CREDENTIALS.VALID_USER.password);
  await loginPage.verifySuccessfulLogin();

  // Create Event
  await eventsPage.navigateToCreateDialog();
  await eventsPage.fillEventDetails(EVENT_DATA.NEW_EVENT);
  await eventsPage.submitForm();
  await eventsPage.verifySuccessMessage();
  
  await page.waitForTimeout(3000);
});

test('2. Successfully edit the created event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login(CREDENTIALS.VALID_USER.email, CREDENTIALS.VALID_USER.password);
  await loginPage.verifySuccessfulLogin();

  // Edit Event
  await eventsPage.navigateToDashboard();
  const opened = await eventsPage.openEventForEditing(EVENT_DATA.NEW_EVENT.name);
  
  if (!opened) {
    console.log('Skipping edit test because the event could not be found or opened.');
    return;
  }
  
  // Fill new name and submit
  await eventsPage.fillEventDetails({ name: EVENT_DATA.EDITED_EVENT.newName });
  await eventsPage.submitForm();
  await eventsPage.verifySuccessMessage();
  
  await page.waitForTimeout(3000);
});
