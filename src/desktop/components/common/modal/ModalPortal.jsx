import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  const [element, setElement] = useState(document.createElement('div'));

  useEffect(() => {
    const roots = document.getElementsByClassName('modal-root');
    if (roots === 0) {
      throw new Error('Invalid modal parent classname');
    }
    roots[0].appendChild(element);

    return () => roots[0].removeChild(element);
  }, []);

  return createPortal(children, element);
};

export default ModalPortal;
