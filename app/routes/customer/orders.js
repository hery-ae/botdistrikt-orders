import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerOrdersRoute extends Route {
  @service store;
  @service customer;

  beforeModel() {
    if (!this.customer.isAuthenticated) {
      this._router.transitionTo('customer.sign-in', {
        queryParams: {
          next: 'customer.orders',
        },
      });
    }
  }

  model() {
    const customer_id = this.customer.acustomer.customer_id;

    return this.store.findRecord('customer', customer_id).then((response) => {
      return response.orders.reload();
    });
  }
}
