import styled from 'styled-components';
import { Body, BoxShadow } from '../../../../../constants/Mixins';


export const DiscreteSliderWrapper = styled.div`
  color: ${({ color }) => color};
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: ${({ margin }) => margin};
`;

export const DiscreteSliderTitle = styled.div`
  ${Body}
  margin-right: 40px;
  width: 60px;
  color: ${({theme}) => theme.dark2};
`;

export const SliderBarWrapper = styled.div`
  width: 300px;
  margin: auto 0;
  margin-right: 40px;
`;

export const SliderNodeText = styled.div`
  ${Body}
  color: ${({theme}) => theme.dark2};
  font-weight: 600;
`;

export const SliderRail = styled.div`
  margin: auto;
  width: 100%;
  height: 8px;
  background-color: ${({theme}) => theme.light3};
  border-radius: 4px;
  cursor: pointer;
  ${BoxShadow}
`;

export const SliderHandle = styled.div`
  left: ${({percent}) => percent}%;
  position: absolute;
  margin-left: -16px;
  margin-top: -20px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border: 3px solid ${({theme}) => theme.white};
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({color}) => color};
  ${BoxShadow}
`;

export const SliderTrack = styled.div`
  position: absolute;
  height: 8px;
  z-index: 1;
  margin-top: -8px;
  background-color: ${({color}) => color};
  border-radius: 4px;
  cursor: pointer;
  left: ${({source}) => source.percent}%;
  width: ${({target, source}) => target.percent - source.percent}%;
`;

export const SliderTick = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${({color}) => color};
  border-radius: 50%;
  box-sizing: content-box;
  border: 3px solid ${({theme}) => theme.white};
`;