import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IconUser from '../../assets/ic-user.svg';
import Logo from '../../assets/logo.svg';
import { ModalContext } from '../../contexts';
import { clearStorages, getUser } from '../../utils/common';
import styles from './styles.scoped.css';

export default function PageBase({ children }) {

  const { content, setContent } = useContext(ModalContext);
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setContent(null);
    }
  };

  const modalClass = [styles.modal, content && styles.open]
    .filter(Boolean)
    .join(' ');

  const _handleLogout = () => {
    clearStorages();
    location.href='/';
  };

  return (
    <>
      <div className={styles.container}>
        <header>
          <img src={Logo} />
          <span onClick={_handleLogout}>
            <h6>{getUser() ? getUser() : 'Welcome'}</h6>
            <img src={IconUser} />
          </span>
        </header>
        <section className={styles.content}>
          {children}
          <div className={modalClass} id="modal" onClick={closeModal}>
            {content}
          </div>
        </section>
      </div>
    </>
  );
}

PageBase.defaultProps = {
  children: null,
};

PageBase.propTypes = {
  children: PropTypes.node,
};
