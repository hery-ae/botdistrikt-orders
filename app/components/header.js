import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import ENV from 'botdistrikt-orders/config/environment';
import fetch from 'fetch';
import bootstrap from 'bootstrap';

export default class HeaderComponent extends Component {
  constructor(owner, args) {
    super(owner, args);

    document.body.onload = function () {
      if (document.querySelector('.dropdown')) {
        new bootstrap.Dropdown(document.querySelector('.dropdown'));
      }
    };
  }

  get authUsername() {
    let match = document.cookie.match(/auth-username=([^;]*)/);

    if (match) {
      return match[1];
    }

    return undefined;
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
