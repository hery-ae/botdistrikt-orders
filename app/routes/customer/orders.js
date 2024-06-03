import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerOrdersRoute extends Route {
  @service customer;
  @service router;

  controllerName = 'customer';

  beforeModel(transition) {
    if (!this.customer.isAuthenticated()) {
      this.router.transitionTo('customer.sign-in', {
        queryParams: {
          next: this.router.urlFor(transition.targetName),
        },
      });
    }
  }

  model() {
    return this.customer.currentCustomer.orders;
  }
}
