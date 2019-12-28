import React from 'react';
import { ModalContext } from '../../data/providers/ModalProvider';

const WithModalComponent = ({ children, ...props }) => {
  console.log(props);
  return (
    <ModalContext.Consumer>
      {context => {
        console.log(context);
        children({ context, ...props });
      }}
    </ModalContext.Consumer>
  );
};

const withModal = Child => (
  <WithModalComponent>
    <Child />
  </WithModalComponent>
);

export default withModal;
