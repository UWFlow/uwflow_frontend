import React, { useState, useEffect, useCallback } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import PropTypes from 'prop-types';

/* Styled Components */
import { ModalBackdrop, ModalWrapper } from './styles/Modal';

/* Child Components */
import ModalPortal from './ModalPortal';
import PopInAnOutAnimation from '../../../../utils/animation/PopInAndOutAnimation';

const ModalHOC = ({ children, onCloseModal, isModalOpen }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(false);

  const handleKeyPress = useCallback(event => {
    const { keyCode } = event;
    if (keyCode === 27) { // ESC key
      onCloseModal();
    }
  }, [onCloseModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const onAnimationFinish = () => {
    setTrulyOpen(isModalOpen);
  };

  const backdropStart = 'rgba(255, 255, 255, 0)';
  const backdropEnd = 'rgba(25, 42, 50, 0.7)';

  return isModalOpen || isTrulyOpen ? (
    <ModalPortal>
      <Spring
        native
        config={config.default}
        from={{ back: isModalOpen ? backdropStart : backdropEnd }}
        to={{ back: isModalOpen ? backdropEnd : backdropStart }}
        onRest={onAnimationFinish}
      >
        {({ back }) => (
          <ModalBackdrop
            onClick={onCloseModal}
            style={{
              background: back,
            }}
          >
            <PopInAnOutAnimation
              isOpen={isModalOpen}
              onAnimationFinish={onAnimationFinish}
            >
              <ModalWrapper>{children}</ModalWrapper>
            </PopInAnOutAnimation>
          </ModalBackdrop>
        )}
      </Spring>
    </ModalPortal>
  ) : null;
};

ModalHOC.propTypes = {
  children: PropTypes.any.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired
};

export default ModalHOC;
