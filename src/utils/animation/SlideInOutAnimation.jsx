import React from 'react';

/* Styled Components */
import {
  SlideInOutAnimationWrapper,
  ChildrenWrapper,
} from './styles/SlideInOutAnimation';

const SlideInOutAnimation = ({ isOpen, children, onFinish, styles = {} }) => {
  const onRest = () => {
    setTrulyOpen(isOpen);
    onFinish && onFinish();
  };

  const { yTransform } = useSpring({
    from: { yTransform: isOpen ? 0 : 100 },
    to: { yTransform: isOpen ? 100 : 0 },
    onRest: onRest,
    config: isOpen ? config.stiff : { mass: 1, tension: 300, friction: 30 },
  });

  return isTrulyOpen || isOpen ? (
    <SlideInOutAnimationWrapper
      style={{
        height: yTransform.interpolate(yTransform => `${yTransform}%`),
        ...styles,
      }}
    >
      <ChildrenWrapper
        style={{
          transform: yTransform.interpolate(
            yTransform => `translateY(${yTransform}%)`,
          ),
          ...styles,
        }}
      >
        {children}
      </ChildrenWrapper>
    </SlideInOutAnimationWrapper>
  ) : null;
};

export default SlideInOutAnimation;
