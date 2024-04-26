import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'botdistrikt-orders/config/environment';
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default class ApplicationAdapter extends RESTAdapter {
  host = ENV.API_HOST;
  namespace = ENV.API_NAMESPACE;

  get headers() {
    let headers = {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json',
    };

    let cookieMatch = document.cookie.match(/auth-token\=([^;]*)/);

    if (cookieMatch) {
      headers['X-Access-Token'] = cookieMatch[1];
    }

    return headers;
  }

  pathForType(modelName) {
    return pluralize(dasherize(modelName));
  }
}
