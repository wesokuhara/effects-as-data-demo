const { cmds } = require('effects-as-data-universal');
const { testFn, args } = require('effects-as-data/test');
const { getUser, getUsers } = require('./get-users');

const testGetUser = testFn(getUser);
const testGetUsers = testFn(getUsers);

test(
  'getUser() should get a user',
  testGetUser(() => {
    const defaultUser = { name: 'Yoda' };
    const getCmd = cmds.either(
      cmds.httpGet('https://swapi.co/api/people/1'),
      defaultUser
    );

    return args(1)
      .yieldCmd(getCmd)
      .returns({ name: 'Luke Skywalker' });
  })
);

test(
  'getUsers() should get two users',
  testGetUsers(() => {
    const getCmds = [cmds.call(getUser, 1), cmds.call(getUser, 2)];

    return args(1, 2)
      .yieldCmd(getCmds)
      .yieldReturns([{ name: 'Luke Skywalker' }, { name: 'C-3PO' }])
      .returns(['Luke Skywalker', 'C-3PO']);
  })
);
