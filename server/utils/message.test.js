const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const res = generateMessage('John', 'Hello');
    expect(res.from).toBe('John');
    expect(res.text).toBe('Hello');
    expect(res.createdAt).toBeA('number');
  });
});