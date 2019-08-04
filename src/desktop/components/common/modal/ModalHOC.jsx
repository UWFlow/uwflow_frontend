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
  console.log('RENDER');
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const onAnimationFinish = () => {
    setTrulyOpen(isModalOpen);
  };

  const styles = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
  };

  return isModalOpen || isTrulyOpen ? (
    <ModalPortal>
      <ModalContentWrapper overflow={isModalOpen ? 'scroll' : 'hide'}>
        <FadeInOutAnimation
          isOpen={isModalOpen}
          endOpacity={0.7}
          onFinish={onAnimationFinish}
          styles={styles}
        >
          <ModalBackdrop onClick={onCloseModal} />
        </FadeInOutAnimation>
        <PopInOutAnimation isOpen={isModalOpen}>
          <ModalWrapper>{children}</ModalWrapper>
        </PopInOutAnimation>
      </ModalContentWrapper>
    </ModalPortal>
  ) : null;
};

ModalHOC.propTypes = {
  children: PropTypes.any.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default ModalHOC;
