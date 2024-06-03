import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CustomerController extends Controller {
  @service customer;
  @service router;

  @tracked email;
  @tracked username;
  @tracked password;
  @tracked confirm;

  queryParams = ['next'];

  next;

  customerTitle = 'Customer';
  signInTitle = 'Sign in';
  signUpTitle = 'Sign up';
  ordersTitle = 'Orders';

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      this.email = '';
      this.username = '';
      this.password = '';
      this.confirm = '';
    });
  }

  @action
  async signIn(event) {
    event.preventDefault();

    event.submitter.disabled = true;

    if (this.username && this.password) {
      const customer = await this.customer.authenticate(
        this.username,
        this.password,
      );

      if (customer.isAuthenticated()) {
        if (this.next) {
          this.router.transitionTo(this.next);
        } else {
          this.router.transitionTo('index');
        }
      } else {
        event.submitter.disabled = false;
        event.target.previousElementSibling.classList.add('show');
      }
    } else {
      event.submitter.disabled = false;
    }
  }

  @action
  signUp(event) {
    event.preventDefault();

    event.submitter.disabled = true;

    const router = this.router;

    if (
      this.email &&
      this.username &&
      this.password &&
      this.confirm === this.password
    ) {
      const customer = this.store.createRecord('customer', {
        email: this.email,
        username: this.username,
        password: this.password,
      });

      customer.save().then(
        function () {
          router.transitionTo('customer.sign-in');
        },
        function (e) {
          event.submitter.disabled = false;
          event.target.previousElementSibling.textContent = e.error;

          event.target.previousElementSibling.classList.add('show');
        },
      );
    } else {
      event.submitter.disabled = false;
      event.target.previousElementSibling.textContent = 'Invalid!';

      event.target.previousElementSibling.classList.add('show');
    }
  }
}
