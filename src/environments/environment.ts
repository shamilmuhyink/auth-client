export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  oauth: {
    google: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId: '781646598643-qr9b9d8v5hugmivcvuecjvh234q1a48m.apps.googleusercontent.com',
      redirectUri: 'http://localhost:4200/auth/callback',
      scope: ['openid', 'email', 'profile'],
      responseType: 'code',
      backendExchangeUrl: 'http://localhost:8080/oauth/callback'
    }
  }
};
