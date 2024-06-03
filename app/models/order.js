import Model, { attr, belongsTo } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr customer_id;
  @attr menu_item_id;
  @attr qty;

  @belongsTo('customer', {
    async: true,
    inverse: 'orders',
  })
  customer;

  @belongsTo('menu-item', {
    async: true,
    inverse: 'orders',
  })
  menuItem;
}
