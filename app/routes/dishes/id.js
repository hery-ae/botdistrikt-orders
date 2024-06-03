import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DishesIdRoute extends Route {
  @service store;
  @service customer;
  @service router;

  controllerName = 'dish';

  model(params) {
    return this.store.findRecord('menu-item', params.dish_id);
  }

  afterModel(model) {
    if (!this.customer.isAuthenticated()) {
      this.router.transitionTo('customer.sign-in', {
        queryParams: {
          next: this.router.urlFor('dishes.id', model),
        },
      });
    }
  }
}
