import Model, { attr, belongsTo } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr menu_item_id;
  @attr customer_id;
  @attr qty;

  @belongsTo('menu-item', { async: true, inverse: null }) menuItem;
}
