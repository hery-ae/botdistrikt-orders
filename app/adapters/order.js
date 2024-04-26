import ApplicationAdapter from './application';

export default class OrderAdapter extends ApplicationAdapter {
  urlForFindAll(modelName, snapshot) {
    let cookieMatch = document.cookie.match(/auth-username\=([^;]*)/);

    return super
      .urlForFindAll(null, snapshot)
      .concat('/customers/')
      .concat(cookieMatch[1])
      .concat('/')
      .concat(this.pathForType(modelName));
  }
}
