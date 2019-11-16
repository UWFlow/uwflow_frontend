import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import FadeInOutAnimation from '../../utils/animation/FadeInOutAnimation';

/* Getters */
import {
  getHeight,
  getIsBrowserDesktop,
} from '../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  windowHeight: getHeight(state),
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const ModalHOC = ({
  children,
  onCloseModal,
  isModalOpen,
  windowHeight,
  isBrowserDesktop,
}) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isModalOpen);
  const classesOnBody = useRef(false);

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
    if (isModalOpen || isTrulyOpen) {
      document.body.classList.add('no-scroll');
      if (isBrowserDesktop) {
        document.body.classList.add('modal-padding');
      }
      classesOnBody.current = true;
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('modal-padding');
      classesOnBody.current = false;
    }
    return () => {
      if (classesOnBody.current) {
        document.body.classList.remove('no-scroll');
        document.body.classList.remove('modal-padding');
      }
    };
  }, [isModalOpen, isTrulyOpen, isBrowserDesktop]);

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
          <ModalScrollableWrapper
            screenHeight={windowHeight}
            onClick={onCloseModal}
          >
            <FadeInOutAnimation isOpen={isModalOpen} styles={{ zIndex: '2' }}>
              <ModalWrapper
                padRight={isBrowserDesktop && !isModalOpen && isTrulyOpen}
              >
                {children}
              </ModalWrapper>
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
