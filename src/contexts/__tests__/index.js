import React from 'react';
import AppContextProvider from '../';

jest.mock('react', () => ({
  ...require.requireActual('react'),
  createContext: () => ({
    Provider: function provider(props) { return <div {...props} />; },
  }),
  useState: v => [v, jest.fn()],
}));

describe('src/contexts', () => {
  test('render', () => {
    const result = AppContextProvider({ children: 'tes' });
    expect(result.props.children).toBe('tes');
  });
});
