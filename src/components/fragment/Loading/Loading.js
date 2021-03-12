import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Loading(props) {
  const { className } = props;
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  return <div className={customClass}><span /></div>;
}

Loading.defaultProps = {
  className: '',
};

Loading.propTypes = {
  className: PropTypes.string,
};
