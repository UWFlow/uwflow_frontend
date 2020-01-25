import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { randBetween, pickOneRandomly } from '../../utils/Random';

/* Selectors */
import { getHeight, getWidth } from '../../../data/reducers/BrowserReducer';

/* Styled Components */
import { Canvas } from './styles/BackgroundAnimation';

/* Utils */
import { timer, interval } from 'd3-timer';

const mapStateToProps = state => ({
  height: getHeight(state),
  width: getWidth(state),
});

const BackgroundAnimation = ({ height, width }) => {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [contextSet, setContextSet] = useState(false);
  const endHeight = height / 6;
  const numLines = 15;

  const getNextCurve1Point = ([x, y, z]) => {
    const retX = x + 10;
    const retY =
      Math.exp(-(retX + width / 2) / (width / 6)) *
        (z - (z / height) * endHeight) +
      (z / height) * endHeight;
    return [retX, retY, z];
  };

  const spawnLine = (startX, startY, lifeTime) => {
    let x = startX;
    let y = startY;
    let z = startY;

    context.globalCompositeOperation = 'source-over';
    context.lineWidth = 6;
    const color = pickOneRandomly({
      '#a4a4a4': 0.64,
      '#9B51E0': 0.12,
      '#2F80ED': 0.12,
      '#F2C94C': 0.12,
    });

    let t = timer(t0 => {
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(x, y);
      [x, y, z] = getNextCurve1Point([x, y, z]);
      context.lineTo(x, y);
      context.stroke();
      if (t0 > lifeTime) t.stop();
    });
  };

  const lineGenerator = () => {
    let intervals = [];
    for (let i = 0; i < 8; i++) {
      intervals.push(
        interval(() => {
          spawnLine(
            -width / 2,
            (Math.floor(randBetween(-numLines, numLines + 1)) * height) /
              numLines /
              2,
            5000,
          );
        }, Math.floor(randBetween(100, 300))),
      );
    }

    return () => {
      intervals.forEach(intv => {
        intv.stop();
      });
    };
  };

  const fadeTick = () => {
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = 'rgba(255,255,255,.15)';
    context.fillRect(-width / 2, -height / 2, width, height);
  };

  useEffect(() => {
    setContext(canvasRef.current.getContext('2d'));
    setContextSet(true);

    return () => setContextSet(false);
  }, []);

  useLayoutEffect(() => {
    let stopAllTimers = null;

    if (contextSet) {
      context.translate(width / 2, height / 2);
      context.fillStyle = '#fff';
      context.fillRect(-width / 2, -height / 2, width, height);

      const stopLines = lineGenerator();
      const fadeInterval = interval(fadeTick, 10);
      stopAllTimers = () => {
        stopLines();
        fadeInterval.stop();
      };
    }

    return () => {
      if (typeof stopAllTimers == 'function') {
        stopAllTimers();
      }
    };
  }, [contextSet, width, height]);

  return <Canvas width={width} height={height} ref={canvasRef} />;
};

export default connect(mapStateToProps)(BackgroundAnimation);
