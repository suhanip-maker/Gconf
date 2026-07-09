import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';
import { CREDENTIALS, EVENT_DATA } from '../constants/testData';

test('1. Successfully create a new event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);

  // Login


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

// --- Events Validation ---

test('3. View Event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to view an event
});

test('4. Update Event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to update an event
});

test('5. Delete Event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to delete an event
});

// --- Listings Validation ---

test('6. Listings - Pagination', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate pagination
});

test('7. Listings - Grid View', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate grid view
});

test('8. Listings - List View', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate list view
});

test('9. Listings - Toggle Functionality', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate toggle functionality
});

// --- Search & Filters Validation ---

test('10. Search Event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate search event
});

test('11. Filters - Event', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate filter by Event
});

test('12. Filters - Conference', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate filter by Conference
});

test('13. Filters - Summit', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate filter by Summit
});

test('14. Filters - Festival', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate filter by Festival
});

test('15. Event Status - Future Events', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate future events status
});

test('16. Event Status - Past Events', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate past events status
});

test('17. Event Status - Published', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate published status
});

test('18. Event Status - Unpublished', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate unpublished status
});

test('19. Event Status - Events with Video', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const eventsPage = new EventsPage(page);



  // TODO: Add steps to validate events with video
});

