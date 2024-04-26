import Model, { attr } from '@ember-data/model';

export default class MenuItemOrderModel extends Model {
  @attr menu_item_id;
  @attr order_id;
}
