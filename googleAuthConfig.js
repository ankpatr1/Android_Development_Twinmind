// googleAuthConfig.js
export const config = {
    issuer: 'https://accounts.google.com',
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    redirectUrl: 'com.googleusercontent.apps.YOUR_GOOGLE_CLIENT_ID:/oauth2redirect/google',
    scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    },
  };
  