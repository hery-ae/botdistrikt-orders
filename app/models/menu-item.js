import Model, { attr } from '@ember-data/model';

export default class MenuItemModel extends Model {
  @attr name;
  @attr image;
  @attr description;
  @attr price;
  @attr price_tag;
  @attr image_path;
}
