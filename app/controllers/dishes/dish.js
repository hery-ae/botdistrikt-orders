import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DishesDishController extends Controller {
  @service store;
  @service router;

  @tracked qty = 1;

  @action
  submit(event) {
    event.preventDefault();

    const cookieMatch = document.cookie.match(/auth-username\=([^;]*)/);
    const store = this.store;
    const router = this.router;

    const order = store.createRecord('order', {
      menu_item_id: this.model.id,
      customer_username: cookieMatch[1],
      qty: this.qty,
    });

    order.save().then(function (response) {
      if (!response.isError) {
        store
          .createRecord('menu-item-order', {
            menu_item_id: response.menu_item_id,
            order_id: response.id,
          })
          .save()
          .then(function (response) {
            if (!response.isError) {
              router.transitionTo('customer.orders');
            }
          });
      }
    });
  }
}
