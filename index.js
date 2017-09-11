const { getUsers } = require('./functions/get-users');
const { buildFunctions } = require('effects-as-data');
const { handlers } = require('effects-as-data-universal');

const config = {
  onCommandComplete: t => {
    console.log(`${t.success} ${t.command.type} (${t.latency}ms)`);
  }
};

// call(config, handlers, getUsers, 1, 2, 3)
//   .then(console.log)
//   .catch(console.error);

// Using buildFunctions which maps each function to use call()
const fxns = buildFunctions(config, handlers, { getUsers });
fxns.getUsers(1, 2, 3, 4)
  .then(console.log)
  .catch(console.error);
