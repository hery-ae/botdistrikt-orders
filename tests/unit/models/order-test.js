import { module, test } from 'qunit';

import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Model | order', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('order', {});
    assert.ok(model);
  });
});
