import React, { useState, useCallback, memo } from 'react';
import { ModalContext } from '../../data/providers/ModalProvider';
import _ from 'lodash';

/* Utils */
import { randString } from '../../utils/Random';

const ModalComponentInner = memo(
  ({ Child, id, childProps, openModal, closeModal }) => {
    const open = useCallback(
      (modal, props = {}) => openModal(modal, id, props),
      [id, openModal],
    );
    const close = useCallback(modal => closeModal(modal, id), [id, closeModal]);
    return <Child {...{ ...childProps, openModal: open, closeModal: close }} />;
  },
  (prevProps, newProps) => _.isEqual(prevProps, newProps),
);

const WithModalComponent = ({ Child, props }) => {
  const [id] = useState(randString());
  return (
    <ModalContext.Consumer>
      {context => (
        <ModalComponentInner
          Child={Child}
          id={id}
          childProps={props}
          openModal={context.openModal}
          closeModal={context.closeModal}
        />
      )}
    </ModalContext.Consumer>
  );
};

const withModal = Child => props => {
  const newChild = memo(Child, (prevProps, newProps) =>
    _.isEqual(prevProps, newProps),
  );
  return <WithModalComponent props={props} Child={newChild} />;
};

export default withModal;
