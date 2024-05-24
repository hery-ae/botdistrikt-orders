import { module, test } from 'qunit';
import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Route | customer/sign-out', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:customer/sign-out');
    assert.ok(route);
  });
});
