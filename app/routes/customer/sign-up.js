import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerSignUpRoute extends Route {
  @service customer;

  beforeModel() {
    if (this.customer.isAuthenticated) {
      this._router.transitionTo('index');
    }
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.setDefaultValues();
  }
}
