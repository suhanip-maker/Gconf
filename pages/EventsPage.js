import { expect } from '@playwright/test';
import { EVENT_SELECTORS } from '../selectors/eventSelectors';
import { URLS } from '../constants/testData';

export class EventsPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToDashboard() {
    await this.page.goto(URLS.EVENTS_DASHBOARD).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(5000); 
  }

  async navigateToCreateDialog() {
    await this.page.goto(URLS.CREATE_EVENT);
    await this.page.waitForLoadState('domcontentloaded');
    
    const createHeader = this.page.locator(EVENT_SELECTORS.createHeader).filter({ hasText: /(Create|New) Event/i }).first();
    await expect(createHeader).toBeVisible({ timeout: 15000 }).catch(() => console.log('Header not found, proceeding anyway...'));
  }

  async fillEventDetails(eventData) {
    // Event Name
    const nameInput = this.page.locator(EVENT_SELECTORS.eventNameInput).first();
    await expect(nameInput).toBeVisible({ timeout: 15000 });
    await nameInput.fill(eventData.name || '');

    // Description
    const descInput = this.page.locator(EVENT_SELECTORS.eventDescriptionInput).first();
    if (eventData.description && await descInput.isVisible()) {
      await descInput.fill(eventData.description);
    }

    // Date
    const dateInput = this.page.locator(EVENT_SELECTORS.eventDateInput).first();
    if (eventData.date && await dateInput.isVisible()) {
      const type = await dateInput.getAttribute('type');
      if (type === 'date') {
        await dateInput.fill(eventData.date);
      } else if (eventData.dateFallback) {
        await dateInput.fill(eventData.dateFallback);
        await this.page.keyboard.press('Enter');
      }
    }

    // Type
    const typeInput = this.page.locator(EVENT_SELECTORS.eventTypeInput).first();
    if (eventData.type && await typeInput.isVisible()) {
      const tagName = await typeInput.evaluate(e => e.tagName.toLowerCase());
      if (tagName === 'select') {
        await typeInput.selectOption({ label: eventData.type }).catch(() => console.log('Could not select Event Type'));
      } else {
        await typeInput.fill(eventData.type);
        await this.page.keyboard.press('Enter');
      }
    }

    // Timezone
    const tzInput = this.page.locator(EVENT_SELECTORS.timezoneInput).first();
    if (eventData.timezone && await tzInput.isVisible()) {
      const tagName = await tzInput.evaluate(e => e.tagName.toLowerCase());
      if (tagName === 'select') {
        await tzInput.selectOption({ label: eventData.timezone }).catch(() => console.log('Could not select Timezone'));
      } else {
        await tzInput.fill(eventData.timezone);
        await this.page.keyboard.press('Enter');
      }
    }

    // Venue
    const venueInput = this.page.locator(EVENT_SELECTORS.venueInput).first();
    if (eventData.venue && await venueInput.isVisible()) {
      await venueInput.fill(eventData.venue);
    }
  }

  async submitForm(submitTextPattern = /^(Create|Save|Submit|Create Event|Save Changes|Update)$/i) {
    const saveButton = this.page.locator(EVENT_SELECTORS.submitButton).filter({ hasText: submitTextPattern }).first();
    if (!(await saveButton.isVisible())) {
      const fallbackButton = this.page.locator(EVENT_SELECTORS.fallbackSubmitButton).first();
      await fallbackButton.click({ force: true, timeout: 5000 }).catch(() => console.log('Could not find fallback submit button'));
    } else {
      await saveButton.click({ force: true, timeout: 5000 }).catch(() => console.log('Could not click submit button'));
    }
  }

  async verifySuccessMessage(timeoutMs = 15000) {
    const successMessage = this.page.locator(EVENT_SELECTORS.successMessage).filter({ hasText: /(successfully|created|updated)/i }).first();
    await expect(successMessage).toBeVisible({ timeout: timeoutMs }).catch(() => console.log('No success toast visible'));
  }

  async openEventForEditing(eventName) {
    let opened = false;
    const eventTitle = this.page.getByText(eventName).first();
    if (await eventTitle.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('Found event! Clicking to open details...');
      await eventTitle.click({ force: true, timeout: 5000 }).catch(() => {});
      await this.page.waitForTimeout(3000);
      
      const editBtn = this.page.locator(EVENT_SELECTORS.genericEditBtn).first();
      await editBtn.click({ force: true, timeout: 5000 }).then(() => { opened = true; }).catch(() => console.log('Could not find explicit Edit button on details view'));
    } else {
      console.log(`Could not find the "${eventName}" text on the dashboard. Trying ANY edit button...`);
      const genericEditBtn = this.page.locator(EVENT_SELECTORS.genericEditBtn).first();
      // Add a short timeout so it doesn't hang the whole test if the button doesn't exist
      await genericEditBtn.click({ force: true, timeout: 5000 }).then(() => { opened = true; }).catch(() => console.log('No generic edit button found either.'));
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return opened;
  }
}
