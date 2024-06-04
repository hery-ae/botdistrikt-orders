import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class ApplicationController extends Controller {
  @service customer;
  @service router;

  appTitle = 'Botdistrikt Restaurant Orders';

  customerTitle = 'Customer';
  signInTitle = 'Sign in';
  signUpTitle = 'Sign up';
  orderTitle = 'Orders';

  dishTitle = 'Dishes';

  @computed('customer.currentCustomer')
  get currentCustomer() {
    return this.customer.currentCustomer;
  }

  get isSignIn() {
    return this.router.currentRouteName === 'customer.sign-in';
  }

  @action
  transitionToSignIn() {
    this.router.transitionTo('customer.sign-in', {
      queryParams: {
        next: this.router.currentURL,
      },
    });
  }

  @action
  async signOut() {
    const customer = await this.customer.reset();

    if (!customer.isAuthenticated()) {
      this.router.transitionTo('index');
    }
  }
}
