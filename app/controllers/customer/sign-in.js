import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class CustomerSignInController extends Controller {
  @service store;
  @service router;
  @service customer;

  @tracked username;
  @tracked password;

  queryParams = ['next'];

  constructor() {
    super(...arguments);
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.username = '';
    this.password = '';
  }

  @action
  submit(event) {
    event.preventDefault();

    event.submitter.disabled = true;

    const _this = this;

    if (_this.username && _this.password) {
      fetch(_this.store.adapterFor('customer').buildURL('customer', 'login'), {
        method: 'POST',
        headers: _this.store.adapterFor('customer').headers,
        body: JSON.stringify({
          username: _this.username,
          password: _this.password,
        }),
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (json) {
            if (_this.customer.authenticate(json).is_authenticated) {
              _this.router.transitionTo(_this.next);
            }
          });
        } else {
          event.submitter.disabled = false;
          event.target.previousElementSibling.classList.add('show');
        }
      });
    } else {
      event.submitter.disabled = false;
    }
  }
}
