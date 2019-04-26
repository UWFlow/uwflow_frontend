import React, { useState, useEffect, useMemo } from 'react';
import { Spring, interpolate, config } from 'react-spring/renderprops';

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

export default ModalHOC;
