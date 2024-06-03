import { module, test } from 'qunit';
import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Controller | dish', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:dish');
    assert.ok(controller);
  });
});
