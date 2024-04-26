import EmberRouter from '@ember/routing/router';
import config from 'botdistrikt-orders/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dishes', function () {
    this.route('dish', {
      path: '/:dish_id',
    });
  });

  this.route('customer', function () {
    this.route('sign-in');
    this.route('sign-up');
    this.route('orders');
  });
});
