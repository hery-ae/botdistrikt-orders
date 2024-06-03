import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SignOutButtonComponent extends Component {
  @service customer;
  @service router;

  @action
  async signOut() {
    const customer = await this.customer.reset();

    if (!customer.isAuthenticated()) {
      this.router.transitionTo('index');
    }
  }
}
