import React, { useState } from 'react';

/* Child Components */
import { config, useSpring } from 'react-spring';

/* Styled Components */
import { ContentWrapper } from './styles/Animations';

const FadeInOutAnimation = ({
  isOpen,
  children,
  endOpacity = 1,
  onFinish,
  styles = {},
}) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isOpen);

  const onRest = () => {
    setTrulyOpen(isOpen);
    onFinish && onFinish();
  };

  const { opacity } = useSpring({
    from: { opacity: isOpen ? 0 : endOpacity },
    to: { opacity: isOpen ? endOpacity : 0 },
    onRest: onRest,
    config: { mass: 1, tension: 200, friction: 26, duration: 200 },
  });

  return isTrulyOpen || isOpen ? (
    <ContentWrapper
      style={{
        opacity: opacity,
        ...styles,
      }}
    >
      {children}
    </ContentWrapper>
  ) : null;
};

export default FadeInOutAnimation;
