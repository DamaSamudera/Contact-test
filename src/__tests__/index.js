import React from 'react';
import { moduleHotAccept } from '../';
import { render } from 'react-dom';
import configureStore from '../store/configureStore';
import '../webpack-public-path';

const mockComponent = (name, props) => <div className={name} {...props} />;

jest.mock('../App', () => ({
  __esModule: true,
  default: props => mockComponent('App', props),
}));
jest.mock('../store/configureStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
  history: {},
}));
jest.mock('react-dom');
jest.mock('typeface-roboto', () => null);
jest.mock('typeface-montserrat', () => null);
jest.mock('react-dom');
jest.mock('../webpack-public-path', () => null);

describe('src/index', () => {
  test('render', () => {
    moduleHotAccept({ hot: { accept: (_, cb) => cb() } });
    expect(configureStore).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(2);
  });
});
