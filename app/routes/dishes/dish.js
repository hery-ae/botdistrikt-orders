import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DishesDishRoute extends Route {
  @service store;
  @service router;

  beforeModel() {
    if (!document.cookie.match(/auth-token=([^;]*)/)) {
      this.router.replaceWith('customer.sign-in');
    }
  }

  model(params) {
    return this.store.findRecord('menu-item', params.dish_id);
  }
}
