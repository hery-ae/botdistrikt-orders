import Service from '@ember/service';
import { set, get } from '@ember/object';
import { underscore } from 'botdistrikt-orders/utils/string-utils';

export default class CustomerService extends Service {
  constructor() {
    super(...arguments);

    this.authenticate(
      Object.keys(this.cookie_props).reduce((props, key) => {
        props[this.cookie_props[key]] = this.cookie(key);

        return props;
      }, {}),
    );
  }

  get isAuthenticated() {
    return Object.keys(this.cookie_props).reduce((props, key) => {
      return Boolean(this.cookie(key));
    }, true);
  }

  cookie_props = {
    'customer-id': 'userId',
    'access-token': 'id',
  };

  cookie(key) {
    if (
      document.cookie
        .split('; ')
        .some((cookie) => cookie.trim().startsWith(String(key).concat('=')))
    ) {
      let cookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.trim().startsWith(String(key).concat('=')))
        .split('=');

      return cookie[1];
    }

    return undefined;
  }

  authenticate(customer) {
    set(this, 'acustomer', {});
    set(this.acustomer, 'is_authenticated', true);

    Object.keys(this.cookie_props).forEach((prop) => {
      const value = get(customer, get(this.cookie_props, prop));

      if (value) {
        set(this.acustomer, underscore(prop), value);

        document.cookie = String(prop)
          .concat('=')
          .concat(value)
          .concat('; path=/; max-age=')
          .concat(customer.ttl);
      } else {
        set(this.acustomer, 'is_authenticated', false);
      }
    });

    return this.acustomer;
  }

  resetCustomer() {
    set(this.acustomer, 'is_authenticated', false);

    Object.keys(this.cookie_props).forEach((key) => {
      set(this.acustomer, underscore(key), undefined);
      document.cookie = String(key).concat('=; path=/; max-age=0');
    });
  }
}
