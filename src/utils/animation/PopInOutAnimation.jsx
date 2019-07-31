import React, { useState } from 'react';

/* Child Components */
import { config, useSpring } from 'react-spring';

/* Styled Components */
import { ContentWrapper } from './styles/Animations';

const PopInOutAnimation = ({ isOpen, children, onFinish }) => {
  const [isTrulyOpen, setTrulyOpen] = useState(isOpen);

  const onRest = () => {
    setTrulyOpen(isOpen);
    onFinish && onFinish();
  };

  const { size } = useSpring({
    from: { size: isOpen ? 0 : 1 },
    to: { size: isOpen ? 1 : 0 },
    onRest: onRest,
    config: config.stiff,
  });

  return isTrulyOpen || isOpen ? (
    <ContentWrapper
      style={{
        transform: size.interpolate(size => `scale(${size})`),
      }}
    >
      {children}
    </ContentWrapper>
  ) : null;
};

export default PopInOutAnimation;
