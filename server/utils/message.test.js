const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const res = generateMessage('John', 'Hello');
    expect(res.from).toBe('John');
    expect(res.text).toBe('Hello');
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const res = generateLocationMessage('John', '1', '1');
    expect(res.from).toBe('John');
    expect(res.url).toBe(`https://www.google.com/maps?q=1,1`);
    expect(res.createdAt).toBeA('number');
  });
})