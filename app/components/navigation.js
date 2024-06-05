import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class NavigationComponent extends Component {
  @service customer;

  get currentCustomer() {
    return this.customer.currentCustomer;
  }
}
