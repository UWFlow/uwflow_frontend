import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ModalBackdrop,
  ModalWrapper,
  ModalContentWrapper,
} from './styles/Modal';

/* Child Components */
import ModalPortal from './ModalPortal';
import PopInOutAnimation from '../../../../utils/animation/PopInOutAnimation';
import FadeInOutAnimation from '../../../../utils/animation/FadeInOutAnimation';

const ModalHOC = ({ children, onCloseModal, isModalOpen }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isModalOpen);

  const handleKeyPress = useCallback(
    event => {
      const { keyCode } = event;
      if (keyCode === 27) {
        // ESC key
        onCloseModal();
      }
    },
    [onCloseModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const onAnimationFinish = () => {
    setTrulyOpen(isModalOpen);
  };

  return (
    (isModalOpen || isTrulyOpen) && (
      <ModalPortal>
        <ModalContentWrapper>
          <FadeInOutAnimation
            isOpen={isModalOpen}
            endOpacity={0.7}
            onFinish={onAnimationFinish}
          >
            <ModalBackdrop onClick={onCloseModal} />
          </FadeInOutAnimation>
          <PopInOutAnimation isOpen={isModalOpen}>
            <ModalWrapper>{children}</ModalWrapper>
          </PopInOutAnimation>
        </ModalContentWrapper>
      </ModalPortal>
    )
  );
};

ModalHOC.propTypes = {
  children: PropTypes.any.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default ModalHOC;
