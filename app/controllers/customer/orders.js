import Controller from '@ember/controller';
import { set } from '@ember/object';

export default class CustomerOrdersController extends Controller {
  grand_total = (orders) => {
    this.total = 0;

    orders.forEach((order) => {
      order.menuItem.then((response) => {
        set(order, 'dish', response);
      });

      if (order.dish) {
        set(this, 'total', this.total + order.dish.price * order.qty);
      }
    });

    return this.total;
  };
}
