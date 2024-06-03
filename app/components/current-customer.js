import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CurrentCustomerComponent extends Component {
  @service customer;
}
