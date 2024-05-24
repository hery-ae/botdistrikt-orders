import Route from '@ember/routing/route';
import { service } from '@ember/service';
import fetch from 'fetch';

export default class CustomerSignOutRoute extends Route {
  @service store;
  @service customer;

  beforeModel(transition) {
    const _this = this;

    fetch(this.store.adapterFor('customer').buildURL('customer', 'logout'), {
      method: 'POST',
      headers: this.store.adapterFor('customer').headers,
    }).then(function (response) {
      if (response.ok) {
        _this.customer.resetCustomer();

        if (transition.from && transition.from.paramNames.length) {
          _this._router.transitionTo(
            transition.from.name,
            transition.from.attributes,
          );
        } else if (transition.from) {
          _this._router.transitionTo(transition.from.name);
        } else {
          _this._router.transitionTo('index');
        }
      }
    });
  }
}
