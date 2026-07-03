export const EVENT_SELECTORS = {
  createHeader: 'h1, h2, h3, .modal-title, .dialog-title',
  eventNameInput: 'input[name*="name" i], input[name*="title" i], input[placeholder*="Event Name" i], input[placeholder*="Event Title" i], .modal input[type="text"], .dialog input[type="text"], input[type="text"]',
  eventDescriptionInput: 'textarea, input[name*="description" i], input[placeholder*="Description" i], div[contenteditable="true"]',
  eventDateInput: 'input[type="date"], input[placeholder*="date" i], input[name*="date" i]',
  eventTypeInput: 'input[placeholder*="Event Type" i], select[name*="type" i], [aria-label*="Event Type" i]',
  timezoneInput: 'input[placeholder*="Timezone" i], select[name*="timezone" i], [aria-label*="Timezone" i]',
  venueInput: 'input[placeholder*="Venue" i], input[name*="venue" i], [aria-label*="Venue" i]',
  submitButton: 'button:not(.ai-button)', // Note: filtered dynamically in POM
  fallbackSubmitButton: 'button[type="submit"], .modal button.btn-primary, .dialog button.primary',
  successMessage: '.toast, .alert-success, :has-text("successfully")',
  eventContainer: 'tr, .event-card, .card, li',
  editButtonContainer: 'button:has-text("Edit"), a:has-text("Edit"), .fa-edit, .edit-btn, [aria-label*="edit" i]',
  genericEditBtn: 'button:has-text("Edit"), a:has-text("Edit"), [title*="Edit" i], [aria-label*="Edit" i]'
};
