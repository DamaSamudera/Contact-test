import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = React.createContext(null);

export default function AppContextProvider({ children }) {
  const [content, setContent] = useState(null);
  const value = {
    content,
    setContent,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
