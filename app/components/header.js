import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import ENV from 'botdistrikt-orders/config/environment';
import fetch from 'fetch';

export default class HeaderComponent extends Component {
  get authUsername() {
    let match = document.cookie.match(/auth-username=([^;]*)/);

    if (match) {
      return match[1];
    }

    return null;
  }

  @action
  dropdownToggle(event) {
    event.target.nextElementSibling.classList.toggle('show');
  }

  @action
  signOut() {
    set(
      document,
      'cookie',
      String('auth-token=').concat(' ;path=/').concat(' ;max-age=0'),
    );
    set(
      document,
      'cookie',
      String('auth-username=').concat(' ;path=/').concat(' ;max-age=0'),
    );

    fetch(String(ENV.API_URL).concat('/customers/logout'), {
      method: 'POST',
    }).then(function () {
      window.location.reload();
    });
  }
}
