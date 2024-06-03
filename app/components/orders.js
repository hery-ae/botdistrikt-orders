import Component from '@glimmer/component';

export default class OrdersComponent extends Component {
  grandTotal(orders) {
    return orders.reduce((result, order) => {
      order.menuItem.then((dish) => {
        order.dish = dish;
      });

      if (order.dish) {
        return result + order.dish.price * order.qty;
      }

      return result;
    }, 0);
  }
}
