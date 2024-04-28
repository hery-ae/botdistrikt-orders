import { module, test } from 'qunit';

import { setupTest } from 'botdistrikt-orders/tests/helpers';

module('Unit | Serializer | application', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  let models = ['customer', 'menu-item', 'order', 'menu-item-order'];

  models.forEach( function(item) {
    test('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor(item);
  
      assert.ok(serializer);
    });
  
    test('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord(item, {});
  
      let serializedRecord = record.serialize();
  
      assert.ok(serializedRecord);
    });

  });

});
