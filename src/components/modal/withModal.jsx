import React, { useState } from 'react';
import { ModalContext } from '../../data/providers/ModalProvider';

/* Utils */
import { randString } from '../../utils/Random';

const WithModalComponent = ({ children, ...props }) => {
  const [id, setId] = useState(randString());

  return (
    <ModalContext.Consumer>
      {context => {
        return React.cloneElement(children, {
          openModal: (modal, props = {}) => context.openModal(modal, id, props),
          closeModal: modal => context.closeModal(modal, id),
          ...props,
        });
      }}
    </ModalContext.Consumer>
  );
};

const withModal = Child => props => (
  <WithModalComponent {...props}>
    <Child />
  </WithModalComponent>
);

export default withModal;
