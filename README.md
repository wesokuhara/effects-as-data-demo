# Effects as Data Demo

Read More: https://github.com/orourkedd/effects-as-data

### Commands
Commands are simply JavaScript objects.  They declare which effect to happen
and set of arguments for that effect.
```js
function httpGet() {
  return {
    type: 'httpGet',
    url
  };
}
```

### Handlers
Handlers map commands to their respective functions which actually
perform the effect. Commonly used handlers are provided in `effects-as-data-universal`.
```js
const handlers = {
  httpGet: () => {
    // do GET
  },
  httpPost: () => {
    // do POST
  }
};
```

### Functions
Functions are function generators that yield your commands.  Functions will contain all of your business logic.
```js
const cmds = require('effects-as-data-universal');

function* getUser(id) {
  const user = yield cmds.httpGet(`https://swapi.co/api/people/${id}`);
  return user.name;
}
```

### Call
`call()` hooks up the commands in a function to its respective handler. In this way,
the effects are decoupled from your business logic. `call()` will
also execute the function and return a promise.
Note: `call()` is different than the command 'call'.
```js
const { call } = require('effects-as-data');
const { handlers } = require('effects-as-data-universal');
const getUser = require('./get-user');

function call(config, handlers, getUser, ...args) {};
```

### Build Functions
`buildFunctions()` will transform your effects-as-data function generators into normal
promise-returning functions by mapping each using `call()`, and return
an object containing the transformed functions. Then these functions can be imported and called anywhere. 
```js
const { buildFunctions } = require('effects-as-data');
const { handlers } = require('effects-as-data-universal');
const getUser = require('./get-user');

const fxns = buildFunctions(config, handlers, { getUser });
fxns.getUser().then(console.log);
```

### Testing
```js
const { testFn, args } = require('effects-as-data/test');
const cmds = require('effects-as-data-universal');
const getUser = require('./get-user');

const testGetUser = testFn(getUser)

describe('getUser()', () => {
  it('should get a user', testGetUser(() => {
    const person = { name: 'C-3P0'};
    return args(2)
      .yieldCmd(cmds.httpGet(`https://swapi.co/api/people/2`)).yieldReturns(person)
      .returns(person.name);
  }));
});
```

### RPC
When we want to call a function from another service, we need to create an
RPC command.  Then the service's RPC resolver takes the request and calls
the desired function, returning a failable.
```js
function getUsersById(id) {
  return yield ({
    type: "rpc",
    service: "user_service",
    fn: "getUser",
    payload: {
      id
    }
  });
}
```
