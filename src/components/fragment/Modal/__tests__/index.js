import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal, { Content } from '../Modal';
import { ModalContext } from '../../../../contexts';

jest.mock('react', () => ({
  ...require.requireActual('react'),
  useContext: v => v,
  useEffect: cb => cb(),
  useState: v => [v === 'tes' ? v : !v, jest.fn()],
}));

jest.mock('../../../../contexts', () => ({
  ModalContext: {
    content: '',
    setContent: jest.fn(),
  },
}));

describe('src/components/elements/Modal', () => {
  test('render', () => {
    Modal.defaultProps.onClose();
    Modal.defaultProps.onClose = jest.fn();
    Modal(Modal.defaultProps);
    expect(ModalContext.setContent).toHaveBeenNthCalledWith(1, null);
    expect(Modal.defaultProps.onClose).toHaveBeenCalled();

    const openProps = { ...Modal.defaultProps, open: true };
    const { className, children } = Modal.defaultProps;
    const contentProps = { children, className, };
    ModalContext.content = 'content';
    Modal(openProps);
    expect(ModalContext.setContent).toHaveBeenNthCalledWith(2, <Content {...contentProps} />);

    ModalContext.content = 'tes';
    Modal(Modal.defaultProps);
  });

  test('Content', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Content />);
    expect(tree).toMatchSnapshot();
  });
});
