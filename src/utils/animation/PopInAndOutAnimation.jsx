import React, { useState, useEffect } from 'react';

/* Child Components */
import { Spring, config, interpolate } from 'react-spring/renderprops';

/* Styled Components */
import { ContentWrapper } from './styles/PopInAndOutAnimation';

const PopInAndOutAnimation = ({ isOpen, children, onAnimationFinish }) => {
  return (
    <Spring
      native
      config={config.stiff}
      from={{ size: isOpen ? 0 : 1 }}
      to={{
        size: isOpen ? 1 : 0,
      }}
      onRest={onAnimationFinish}
    >
      {({ size }) => (
        <ContentWrapper
          style={{
            transform: interpolate([size], s => `scale(${s})`),
          }}
        >
          {children}
        </ContentWrapper>
      )}
    </Spring>
  );
};

export default PopInAndOutAnimation;
