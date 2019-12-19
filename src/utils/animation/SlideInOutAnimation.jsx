import React, { useState, useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';

/* Styled Components */
import {
  SlideInOutAnimationWrapper,
  ChildrenWrapper,
} from './styles/SlideInOutAnimation';

const SlideInOutAnimation = ({
  isOpen,
  children,
  onFinish,
  shouldAnimateInitialOpen = true,
  styles = {},
}) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isOpen);
  const [childHeight, setChildHeight] = useState(undefined);
  const childRef = useRef();

  const initialHeight = isOpen && !shouldAnimateInitialOpen ? '100%' : '0';
  const initialYTransform =
    isOpen && !shouldAnimateInitialOpen ? 'translateY(0)' : 'translateY(-100)';
  const springFromHeight = childHeight ? (isOpen ? 0 : childHeight) : -1;
  const springFromYTransform = childHeight ? (isOpen ? -100 : 0) : -1;
  const springToHeight = childHeight ? (isOpen ? childHeight : 0) : -1;
  const springToYTransform = childHeight ? (isOpen ? 0 : -100) : -1;

  const onRest = () => {
    setTrulyOpen(isOpen);
    onFinish && onFinish();
  };

  const { yTransform, heightTransform } = useSpring({
    from: {
      heightTransform: springFromHeight,
      yTransform: springFromYTransform,
    },
    to: { heightTransform: springToHeight, yTransform: springToYTransform },
    onRest: onRest,
    config: { mass: 1, tension: 200, friction: 25 },
  });

  useEffect(() => {
    if (childRef) {
      setChildHeight(childRef.current.clientHeight);
    }
  }, [childRef]);

  return isTrulyOpen || isOpen ? (
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
