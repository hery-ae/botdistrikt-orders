import Model, { attr, belongsTo } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr menu_item_id;
  @attr customer_username;
  @attr qty;
  @attr total;
  @attr grand_total;

  @belongsTo('menu-item', { async: true, inverse: null }) menuItem;
}
