import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SignInButtonComponent extends Component {
  @service router;

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
}
