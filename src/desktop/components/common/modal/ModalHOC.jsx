import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Styled Components */
import {
  ModalBackdrop,
  ModalWrapper,
  ModalContentWrapper,
  ModalScrollableWrapper,
} from './styles/Modal';

/* Child Components */
import ModalPortal from './ModalPortal';
import PopInOutAnimation from '../../../../utils/animation/PopInOutAnimation';
import FadeInOutAnimation from '../../../../utils/animation/FadeInOutAnimation';

/* Getters */
import { getHeight } from '../../../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  windowHeight: getHeight(state),
});

const ModalHOC = ({ children, onCloseModal, isModalOpen, windowHeight }) => {
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
        <div>
          <ModalScrollableWrapper screenHeight={windowHeight}>
            <FadeInOutAnimation
              isOpen={isModalOpen}
              styles={{ 'z-index': '2' }}
            >
              <ModalWrapper>{children}</ModalWrapper>
            </FadeInOutAnimation>
          </ModalScrollableWrapper>
        </div>
      </ModalContentWrapper>
    </ModalPortal>
  ) : null;
};

ModalHOC.propTypes = {
  children: PropTypes.any.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ModalHOC);
