import Model, { attr, hasMany } from '@ember-data/model';

export default class CustomerModel extends Model {
  @attr email;
  @attr username;
  @attr password;
}
