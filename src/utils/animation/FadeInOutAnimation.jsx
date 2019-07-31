import React, { useState } from 'react';

/* Child Components */
import { config, useSpring } from 'react-spring';

/* Styled Components */
import { ContentWrapper } from './styles/Animations';

const FadeInOutAnimation = ({ isOpen, children, endOpacity, onFinish }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isOpen);

  const onRest = () => {
    setTrulyOpen(isOpen);
    onFinish && onFinish();
  };

  const { opacity } = useSpring({
    from: { opacity: isOpen ? 0 : endOpacity },
    to: { opacity: isOpen ? endOpacity : 0 },
    onRest: onRest,
    config: config.default,
  });

  return isTrulyOpen || isOpen ? (
    <ContentWrapper
      style={{
        opacity: opacity,
      }}
    >
      {children}
    </ContentWrapper>
  ) : null;
};

export default FadeInOutAnimation;
