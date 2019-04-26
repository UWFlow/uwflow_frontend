import React, { useState, useEffect, useMemo } from 'react';
import { animated } from 'react-spring/renderprops';

/* Styled Components */
import { ModalBackdrop, ModalWrapper } from './styles/Modal';

/* Child Components */
import ModalPortal from './ModalPortal';
import PopInAnOutAnimation from '../../../../utils/animation/PopInAndOutAnimation';

const ModalHOC = ({ children, onCloseModal, isModalOpen }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(false);

  const onAnimationFinish = () => {
    setTrulyOpen(isModalOpen);
  };

  return isModalOpen || isTrulyOpen ? (
    <ModalPortal>
      <ModalBackdrop onClick={onCloseModal}>
        <PopInAnOutAnimation
          isOpen={isModalOpen}
          onAnimationFinish={onAnimationFinish}
        >
          <ModalWrapper>{children}</ModalWrapper>
        </PopInAnOutAnimation>
      </ModalBackdrop>
    </ModalPortal>
  ) : null;
};

export default ModalHOC;
