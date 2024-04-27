import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CustomerSignUpController extends Controller {
  @service store;
  @service router;

  @tracked email = '';
  @tracked username = '';
  @tracked password = '';
  @tracked confirm = '';

  @action
  async submit(event) {
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
          router.replaceWith('customer.sign-in');
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
