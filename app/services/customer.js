import Service, { service } from '@ember/service';
import fetch from 'fetch';

export default class CustomerService extends Service {
  @service store;

  currentCustomer;

  cookieProps = [
    {
      name: 'customer-id',
      key: 'userId',
    },
    {
      name: 'access-token',
      key: 'id',
    },
  ];

  constructor() {
    super(...arguments);

    if (this.isAuthenticated()) {
      this.setCurrentCustomer(this.getCookie('customer-id'));
    }
  }

  authenticate(username, password) {
    const customer = this;

    return fetch(
      this.store.adapterFor('customer').buildURL('customer').concat('/login'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    ).then(async function (response) {
      if (response.ok) {
        await response.json().then(function (json) {
          customer.cookieProps.forEach((prop) => {
            customer.setCookie(prop.name, json);
          });

          customer.setCurrentCustomer(
            json[
              customer.cookieProps.find((prop) => prop.name === 'customer-id')
                .key
            ],
          );
        });
      }

      return customer;
    });
  }

  isAuthenticated() {
    return this.cookieProps.every((prop) => this.hasCookie(prop.name));
  }

  reset() {
    const customer = this;

    return fetch(
      this.store.adapterFor('customer').buildURL('customer', 'logout'),
      {
        method: 'POST',
        headers: this.store.adapterFor('customer').headers,
      },
    ).then(function (response) {
      if (response.ok) {
        customer.resetCookie();
        customer.store.unloadRecord(customer.currentCustomer);
        delete customer.currentCustomer;
      }

      return customer;
    });
  }

  setCookie(key, value) {
    value = String(
      value[this.cookieProps.find((prop) => prop.name === key).key],
    )
      .concat('; path=/; max-age=')
      .concat(
        Math.round(value.ttl + (Date.now() - Date.parse(value.created)) / 1000),
      );

    document.cookie = String(key).concat('=').concat(value);
  }

  getCookie(key) {
    if (this.hasCookie(key)) {
      let cookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.trim().startsWith(String(key).concat('=')))
        .split('=');

      return cookie[1];
    }

    return undefined;
  }

  hasCookie(key) {
    return document.cookie
      .split('; ')
      .some((cookie) => cookie.trim().startsWith(String(key).concat('=')));
  }

  resetCookie() {
    this.cookieProps.forEach((prop) => {
      document.cookie = String(prop.name).concat('=; path=/; max-age=0');
    });
  }

  setCurrentCustomer(id) {
    this.store.pushPayload({
      customer: {
        id: id,
      },
    });

    this.store.findRecord('customer', id).then((response) => {
      response.store.peekRecord('customer', id).setProperties(response);
    });

    this.currentCustomer = this.store.peekRecord('customer', id);
  }

  get accessToken() {
    return this.getCookie('access-token');
  }
}
