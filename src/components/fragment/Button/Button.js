import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function Button(props) {
  const { children, className, disabled, onClick } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
