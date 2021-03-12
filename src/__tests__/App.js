import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

jest.mock('react-hot-loader/root', () => ({ hot: c => c }));
jest.mock('../pages', () => ({ Login: 'login' }));

describe('src/App', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };
    const tree = shallow.render(<App history={{}} store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
