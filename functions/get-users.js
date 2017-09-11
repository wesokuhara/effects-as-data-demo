const { cmds } = require('effects-as-data-universal');
const { pluck } = require('ramda');

function* getUser(id) {
  const defaultUser = { name: 'Yoda' };
  const getCmd = cmds.httpGet(`https://swapi.co/api/people/${id}`);
  return yield cmds.either(getCmd, defaultUser);
}

function* getUsers(...args) {
  const getCmds = args.map(id => cmds.call(getUser, id));
  const results = yield getCmds;
  return pluck('name', results);
}

module.exports = {
  getUser,
  getUsers
};
