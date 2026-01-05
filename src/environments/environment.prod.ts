import { Environment } from './_environment.interface';

const urlBase = 'http://localhost:8000/api/v1';

export const environment: Environment = {
  production: false,
  urlBase,
  timeRequest: 50,

  /* URLS */
  urlLogin: urlBase + '/auth/login',
};
