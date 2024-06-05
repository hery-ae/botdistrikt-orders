import { module, test } from 'qunit';
import { setupRenderingTest } from 'botdistrikt-orders/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sign-in-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SignInButton />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SignInButton>
        template block text
      </SignInButton>
    `);

    assert.dom().hasText('template block text');
  });
});
