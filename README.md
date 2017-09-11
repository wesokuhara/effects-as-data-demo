# Effects as Data Demo

### Commands
Commands are simply JSON.  They designate which effect to happen
and set of arguments for that effect.
```js
function httpGet() {
  return {
    type: 'httpGet',
    url
  }
}
```

### Handlers
Handlers map a command to their respective function that actually
performs the effect. Most handlers are provided in 'effects-as-data-universal'.
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
Functions contain all of the business logic and 'yield' the commands.
```js
function* getUser(id) {
  return yield cmds.httpGet(`https://swapi.co/api/people/${id}`);
}
```

### Call
call() hooks up your handlers to the commands in your functions. In this way,
effects-as-data decouples the effects from your business logic. call() will
also perform the function and return a promise.
call() is imported from 'effects-as-data'.
```js
function call(config, handlers, fn, ...args) {};
```

### Build Functions
buildFunctions() will transform effects-as-data functions into normal
promise-returning functions by mapping each using call(), and return
an object with the mapped functions. Then these functions can be passed
around and called anywhere. buildFunctions() is imported from 'effects-as-data'.
```js
const fxns = buildFunctions(config, handlers, { getUser });
fxns.getUser().then(console.log);
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
