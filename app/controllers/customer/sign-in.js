import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'botdistrikt-orders/config/environment';
import fetch from 'fetch';

export default class CustomerSignInController extends Controller {
  @service router;

  @tracked username = '';
  @tracked password = '';

  @action
  submit(event) {
    event.preventDefault();

    const router = this.router;

    if (this.username && this.password) {
      fetch(
        String(ENV.API_HOST)
          .concat('/')
          .concat(ENV.API_NAMESPACE)
          .concat('/customers/login'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        },
      ).then(function (response) {
        if (response.ok) {
          response.json().then(function (json) {
            let path = ' ;path=/';
            let maxAge = String(' ;max-age=').concat(ENV.COOKIE_MAX_AGE);

            set(
              document,
              'cookie',
              String('auth-token=').concat(json.id).concat(path).concat(maxAge),
            );

            set(
              document,
              'cookie',
              String('auth-username=')
                .concat(event.target[0].value)
                .concat(path)
                .concat(maxAge),
            );

            event.target.submit();
          });
        } else {
          event.target.previousElementSibling.classList.add('show');
        }
      });
    }
  }
}
