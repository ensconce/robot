const { go } = require('./index.js');

describe('go', () => {
  test('Returns the position after executing movements', async () => {
    const fieldSize = '5 5';
    const startPosition = '1 2 N';
    const movements = 'RFRFFRFRF';

    const result = await go(fieldSize, startPosition, movements);

    expect(result).toEqual('1 3 N');
  });

  test('Returns the position after executing movements', async () => {
    const fieldSize = '5 5';
    const startPosition = '0 0 E';
    const movements = 'RFLFFLRF';

    const result = await go(fieldSize, startPosition, movements);

    expect(result).toEqual('3 1 E');
  });
});