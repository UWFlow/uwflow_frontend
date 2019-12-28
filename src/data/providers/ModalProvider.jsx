import React, { useState, createContext } from 'react';
import AuthModal, { AUTH_MODAL } from '../../auth/AuthModal';

export const ModalContext = createContext(null);

const modalNameToModal = {
  [AUTH_MODAL]: (isOpen, props) => <AuthModal isOpen={isOpen} {...props} />,
};

// Note modals can be mounted but not open eg. going through closing animation
// Assume modals are opened in a first open, last closed fashion
const ModalProvider = ({ children }) => {
  const [modalsById, setModalsById] = useState([]);

  const findIndOfModalByIdAndModal = (id, modal, modals) => {
    for (let i = modals.length - 1; i >= 0; i--) {
      if (modals[i].id == id && modals[i].modal == modal) {
        return i;
      }
    }
    return -1;
  };

  const injectOnAfterCloseIntoProps = (modal, id, props) => {
    const originalOnAfterClose = props.onAfterClose;
    props.onAfterClose = () => {
      var newModalsById = [...modalsById];
      newModalsById.splice(
        findIndOfModalByIdAndModal(id, modal, newModalsById),
        1,
      );
      setModalsById(newModalsById);
      if (originalOnAfterClose) {
        originalOnAfterClose();
      }
    };
    return props;
  };

  const openModal = (modal, id, props) => {
    var newModalsById = [...modalsById];
    newModalsById.push({
      id: id,
      modal: modal,
      props: injectOnAfterCloseIntoProps(modal, id, props),
      isOpen: true,
    });
    setModalsById(newModalsById);
  };
  const closeModal = (modal, id) => {
    var newModalsById = [...modalsById];
    newModalsById[
      findIndOfModalByIdAndModal(id, modal, newModalsById)
    ].isOpen = false;
    setModalsById(newModalsById);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal: openModal,
        closeModal: closeModal,
        modalsById: modalsById,
        modalNameToModal: modalNameToModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
