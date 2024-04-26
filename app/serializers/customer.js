import ApplicationSerializer from './application';

export default class CustomerSerializer extends ApplicationSerializer {
  primaryKey = 'username';
}
