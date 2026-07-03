export const URLS = {
  LOGIN: 'https://develop.dash.gconf.ai/login',
  FORGOT_PASSWORD: 'https://develop.dash.gconf.ai/forgot-password',
  EVENTS_DASHBOARD: 'https://develop.dash.gconf.ai/events',
  CREATE_EVENT: 'https://develop.dash.gconf.ai/events/new?dialog=1'
};

export const CREDENTIALS = {
  VALID_USER: {
    email: 'suhanip@zignuts.com',
    password: 'Test@123'
  }
};

export const EVENT_DATA = {
  NEW_EVENT: {
    name: 'Zignuts AI Hub',
    description: 'Zignuts',
    date: '2026-07-05',
    dateFallback: '5 July, 2026',
    type: 'Event',
    timezone: 'Europe',
    venue: 'Zignuts'
  },
  EDITED_EVENT: {
    newName: 'Zignuts Claude AI Event'
  }
};
