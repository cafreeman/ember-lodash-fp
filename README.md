ember-lodash-fp
==============================================================================

This addon exposes the `lodash/fp` module to an Ember app (or addon). The entire module can be imported using `import fp from 'lodash/fp'`, or you can import specific functions using es6 destructuring, e.g. `import { map } lodash/fp`.

For documentation on how `lodash/fp` differs from `lodash`, see the FP Guide [here](https://github.com/lodash/lodash/wiki/FP-Guide).


Installation
------------------------------------------------------------------------------

```
ember install ember-lodash-fp
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-lodash-fp`
* `yarn`

### Linting

* `yarn lint:js`
* `yarn lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
