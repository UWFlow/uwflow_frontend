import React, { useState, useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';

/* Styled Components */
import {
  SlideInOutAnimationWrapper,
  ChildrenWrapper,
} from './styles/SlideInOutAnimation';

const SlideInOutAnimation = ({ isOpen, children, onFinish, styles = {} }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(false);
  const [childHeight, setChildHeight] = useState(undefined);
  const [isMoving, setIsMoving] = useState(isOpen);
  const childRef = useRef();

  const initialHeight = '0';
  const initialYTransform = 'translateY(-100)';
  const springFromHeight = childHeight ? (isOpen ? 0 : childHeight) : -1;
  const springFromYTransform = childHeight ? (isOpen ? -100 : 0) : -1;
  const springToHeight = childHeight ? (isOpen ? childHeight : 0) : -1;
  const springToYTransform = childHeight ? (isOpen ? 0 : -100) : -1;

  const onRest = () => {
    setTrulyOpen(isOpen);
    setIsMoving(false);
    onFinish && onFinish();
  };

  const { yTransform, heightTransform } = useSpring({
    from: {
      heightTransform: springFromHeight,
      yTransform: springFromYTransform,
    },
    to: { heightTransform: springToHeight, yTransform: springToYTransform },
    onRest: onRest,
    config: { duration: 350 },
  });

  useEffect(() => {
    if (childRef) {
      setChildHeight(childRef.current.clientHeight);
    }
  }, [childRef]);

  useEffect(() => {
    if (isOpen != isTrulyOpen) {
      setIsMoving(true);
    }
  }, [isOpen, isTrulyOpen]);

  return isOpen || isMoving ? (
    <SlideInOutAnimationWrapper
      style={{
        height:
          childHeight && heightTransform
            ? heightTransform.interpolate(
                heightTransform => `${heightTransform}px`,
              )
            : initialHeight,
        ...styles,
      }}
    >
      <ChildrenWrapper
        style={{
          transform:
            childHeight && yTransform
              ? yTransform.interpolate(
                  yTransform => `translateY(${yTransform}%)`,
                )
              : initialYTransform,
          ...styles,
        }}
        ref={childRef}
      >
        {children}
      </ChildrenWrapper>
    </SlideInOutAnimationWrapper>
  ) : null;
};

export default SlideInOutAnimation;
