import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerSignInRoute extends Route {
  @service customer;

  controllerName = 'customer';

  beforeModel(transition) {
    if (this.customer.isAuthenticated()) {
      transition.router.transitionTo('index');
    }
  }
}
