import { RenderingTestCase, moduleFor, strip } from 'internal-test-helpers';

import { set } from '@ember/-internals/metal';

moduleFor(
  'syntax refinements',
  class extends RenderingTestCase {
    ['@test block params should not be refined']() {
      this.registerHelper('foo', () => 'bar helper');

      this.render(
        strip`
      {{#with var as |foo|}}
        {{foo}}
      {{/with}}

      ---

      {{#with var as |outlet|}}
        {{outlet}}
      {{/with}}

      ---

      {{#with var as |mount|}}
        {{mount}}
      {{/with}}

      ---

      {{#with var as |component|}}
        {{component}}
      {{/with}}

      ---

      {{#with var as |input|}}
        {{input}}
      {{/with}}

      ---

      {{#with var as |-with-dynamic-vars|}}
        {{-with-dynamic-vars}}
      {{/with}}

      ---

      {{#with var as |-in-element|}}
        {{-in-element}}
      {{/with}}`,
        { var: 'var' }
      );

      this.assertText('var---var---var---var---var---var---var');

      this.runTask(() => set(this.context, 'var', 'RARRR!!!'));

      this.assertText('RARRR!!!---RARRR!!!---RARRR!!!---RARRR!!!---RARRR!!!---RARRR!!!---RARRR!!!');

      this.runTask(() => set(this.context, 'var', 'var'));

      this.assertText('var---var---var---var---var---var---var');
    }
  }
);
