import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CustomerOrdersRoute extends Route {
  @service store;
  @service router;

  beforeModel() {
    if (!document.cookie.match(/auth-token=([^;]*)/)) {
      this.router.replaceWith('customer.sign-in');
    }
  }

  async model() {
    let store = this.store;
    let orders = await store.findAll('order', { reload: true });

    store.pushPayload(
      orders.reduce(async function (orders, order, index) {
        order.menuItem = await store.findRecord(
          'menu-item',
          order.menu_item_id,
        );

        order.total = order.menuItem.get('price') * order.qty;

        if (index > 0) {
          orders = await orders;
          order.grand_total = orders[index - 1].grand_total + order.total;
        } else {
          order.grand_total = order.menuItem.get('price') * order.qty;
        }

        orders.push(order);

        return orders;
      }, []),
    );

    return store.peekAll('order');
  }
}
