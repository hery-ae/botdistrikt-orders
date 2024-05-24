import { module, test } from 'qunit';
import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Route | dishes/id', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dishes/id');
    assert.ok(route);
  });
});
