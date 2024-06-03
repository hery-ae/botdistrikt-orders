import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DishController extends Controller {
  @service store;
  @service customer;
  @service router;

  @tracked qty;

  dishesTitle = 'Dishes';

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      this.qty = 1;
    });
  }

  @action
  order(menuItem, event) {
    const orderForm = this;

    event.preventDefault();

    event.submitter.disabled = true;

    this.store
      .createRecord('order', {
        customer_id: this.customer.currentCustomer.id,
        menu_item_id: menuItem.id,
        qty: this.qty,
      })
      .save()
      .then((response) => {
        if (response.isError) {
          event.submitter.disabled = false;
        } else {
          orderForm.customer.currentCustomer.orders.reload();
          orderForm.router.transitionTo('customer.orders');
        }
      });
  }
}
