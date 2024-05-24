import RESTAdapter from '@ember-data/adapter/rest';
import { service } from '@ember/service';
import { decamelize } from 'botdistrikt-orders/utils/string-utils';

export default class ApplicationAdapter extends RESTAdapter {
  @service customer;

  host = 'http://localhost:3000';
  namespace = 'api';

  _headers = {};

  get headers() {
    this._headers.Accept = 'application/json, text/plain';
    this._headers['Content-Type'] = 'application/json';

    if (this.customer.acustomer) {
      this._headers['X-Access-Token'] = this.customer.acustomer.access_token;
    }

    return this._headers;
  }

  set headers(header) {
    Object.assign(this._headers, header);
  }

  pathForType() {
    let path = super.pathForType(...arguments);

    return decamelize(path, '-');
  }

  findRecord(store, type, id, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.access_token) {
      this.headers = { 'X-Access-Token': snapshot.adapterOptions.access_token };
    }

    return super.findRecord(...arguments);
  }
}
