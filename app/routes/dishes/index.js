import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DishesIndexRoute extends Route {
  @service store;

  controllerName = 'dish';

  model() {
    return this.store.findAll('menu-item');
  }
}
