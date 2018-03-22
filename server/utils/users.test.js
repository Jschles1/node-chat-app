const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  })

  it('should add new user', () => {
    var users = new Users();
    const user = {
      id: '123',
      name: 'John',
      room: 'Chat room'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const removedUser = users.removeUser('1');
    expect(removedUser.name).toBe('Mike');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    users.removeUser('10');
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const user = users.getUser('2');
    expect(user.name).toBe('Jen');
  });

  it('should not find user', () => {
    const user = users.getUser('5');
    expect(user).toNotExist();
  }); 

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });
});