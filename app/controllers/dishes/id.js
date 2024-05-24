import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DishesIdController extends Controller {
  @service store;
  @service router;
  @service customer;

  @tracked qty;

  constructor() {
    super(...arguments);
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.qty = 1;
  }

  @action
  submit(event) {
    event.preventDefault();

    event.submitter.disabled = true;

    const order = this.store.createRecord('order', {
      menu_item_id: this.model.id,
      customer_id: this.customer.customer_id,
      qty: this.qty,
    });

    const _this = this;

    order.save().then(function (response) {
      if (!response.isError) {
        _this.store
          .createRecord('menu-item-order', {
            menu_item_id: response.menu_item_id,
            order_id: response.id,
          })
          .save()
          .then(function (response) {
            if (!response.isError) {
              _this.router.transitionTo('customer.orders');
            } else {
              event.submitter.disabled = false;
            }
          });
      } else {
        event.submitter.disabled = false;
      }
    });
  }
}
