import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import IconClose from '../../../assets/ic-close.svg';
import Modal from '../Modal';
import styles from './styles.scoped.css';

export default function ModalDelete(props) {
  const { message, onClick, onClose, open } = props;

  return (
    <Modal className={styles.root} onClose={onClose} open={open}>
      <header>
        <img alt="close"
          className={styles.close}
          onClick={onClose}
          src={IconClose} />
      </header>
      <section className={styles['modal-content']}>
        <p>{message}</p>
        <span>
          <Button className={styles['btn-cancel']} onClick={onClose}>Cancel</Button>
          <Button className={styles['btn-delete']}onClick={onClick}>Accept</Button>
        </span>
      </section>
    </Modal>
  );
}

ModalDelete.defaultProps = {
  message: '',
  onClick: () => {},
  onClose: () => {},
  open: false,
  type: 'success'
};

ModalDelete.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
};
