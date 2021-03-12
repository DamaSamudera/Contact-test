import configureStore from '../configureStore';

describe('src/store', () => {
  test('configureStore', () => {
    expect(typeof configureStore).toBe('function');
  });
});
