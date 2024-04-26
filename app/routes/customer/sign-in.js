import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerSignInRoute extends Route {
  @service router;

  beforeModel() {
    if (document.cookie.match(/auth-token\=([^;]*)/)) {
      this.router.transitionTo('index');
    }
  }
}
