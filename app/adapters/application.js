import RESTAdapter from '@ember-data/adapter/rest';
import { service } from '@ember/service';
import { decamelize } from 'botdistrikt-orders/utils/camelize';

export default class ApplicationAdapter extends RESTAdapter {
  @service customer;

  host = 'http://localhost:3000';
  namespace = 'api';

  get headers() {
    if (this.customer.isAuthenticated()) {
      return {
        'X-Access-Token': this.customer.accessToken,
      };
    }

    return undefined;
  }

  pathForType() {
    return decamelize(super.pathForType(...arguments));
  }
}
