import { module, test } from 'qunit';
import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Controller | dishes/id', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:dishes/id');
    assert.ok(controller);
  });
});
