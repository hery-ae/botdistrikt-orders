import Model, { attr, hasMany } from '@ember-data/model';

export default class MenuItemModel extends Model {
  @attr name;
  @attr image_file_name;
  @attr image_base_url;
  @attr description;
  @attr price;

  @hasMany('order', {
    async: true,
    inverse: 'menuItem',
  })
  orders;
}
