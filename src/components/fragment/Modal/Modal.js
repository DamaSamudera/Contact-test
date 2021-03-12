import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function Modal(props) {
  const { content, setContent } = useContext(ModalContext);
  const { open, className, children, onClose } = props;

  useEffect(() => {
    if (open) {
      setContent(<Content children={children} className={className} />);
      document.getElementsByTagName('body')[0].classList.add('modal-open');
    } else {
      setContent(null);
      document.getElementsByTagName('body')[0].classList.remove('modal-open');
    }
  }, [open]);

  const [modalContent, setModalContent] = useState(content);

  useEffect(() => {
    if (modalContent && !content) {
      onClose();
      setModalContent(content);
    } else if (!modalContent && content) {
      setModalContent(content);
    }
  });

  return null;
}

Modal.defaultProps = {
  children: null,
  className: '',
  onClose: () => {},
  open: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Content({ className, children }) {
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {children}
    </section>
  );
}

Content.defaultProps = {
  children: null,
  className: '',
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
