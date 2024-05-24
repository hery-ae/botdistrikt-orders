import Component from '@glimmer/component';
import { service } from '@ember/service';
import { set } from '@ember/object';

export default class NavigationComponent extends Component {
  @service customer;
  @service store;

  constructor(owner) {
    super(...arguments);
    set(this, 'acustomer', {});
    set(this, 'router', owner.router);
  }

  customerText(_this) {
    const acustomer = _this.acustomer;

    _this.store
      .findRecord('customer', _this.customer.acustomer.customer_id)
      .then((response) => {
        if (response.isLoaded) {
          set(acustomer, 'customer_id', response.id);
          set(
            acustomer,
            'customer_text',
            String('Hi, ').concat(response.username).concat('!'),
          );
        }
      });

    return acustomer;
  }

  isCurrentCustomer(_this) {
    return _this.customer.acustomer.customer_id === _this.acustomer.customer_id;
  }

  isSignIn(routeName) {
    return routeName === 'customer.sign-in';
  }
}
