import React, { useState, createContext, useRef } from 'react';

export const ModalContext = createContext(null);

// Note modals can be mounted but not open eg. going through closing animation
// Assume modals are opened in a first open, last closed fashion
const ModalProvider = ({ children }) => {
  const [modalsById, setModalsById] = useState([]);
  const currentModalsById = useRef(null);
  currentModalsById.current = modalsById;

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

  const closeModal = (modal, id) => {
    var newModalsById = [...currentModalsById.current];
    newModalsById[
      findIndOfModalByIdAndModal(id, modal, newModalsById)
    ].isOpen = false;
    setModalsById(newModalsById);
  };

  const openModal = (modal, id, props) => {
    var newModalsById = [...currentModalsById.current];
    newModalsById.push({
      id: id,
      modal: modal,
      props: {
        onRequestClose: () => closeModal(modal, id), // default onRequestClose is just close modal, can be overridden with props
        ...injectOnAfterCloseIntoProps(modal, id, props),
      },
      isOpen: true,
    });
    setModalsById(newModalsById);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal: openModal,
        closeModal: closeModal,
        modalsById: modalsById,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
