import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollContext = createContext(null);
export const useScrollContext = () => useContext(ScrollContext);

const ScrollProvider = ({ value, children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (value === null) {
      return;
    }
    value.current.parentNode.scrollTo(0, 0);
  }, [value, pathname]);

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export default ScrollProvider;
