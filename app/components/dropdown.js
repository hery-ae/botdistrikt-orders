import Component from '@glimmer/component';
import { action } from '@ember/object';
import bootstrap from 'bootstrap';

export default class DropdownComponent extends Component {
  @action
  bsDropdown(e) {
    if (!e.srcElement.dataset.bsToggle) {
      e.srcElement.dataset.bsToggle = 'dropdown';
      new bootstrap.Dropdown(e.target.closest('.dropdown')).show();
    }
  }
}
