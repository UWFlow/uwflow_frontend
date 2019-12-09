import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { BoxShadow, Body } from '../../../constants/Mixins';

export const TooltipWrapper = styled(ReactTooltip)`
  &.type-dark {
    ${Body}
    ${BoxShadow}
    background-color: ${({theme}) => theme.light1};
    padding: 8px;
    max-width: 200px;
    color: ${({theme}) => theme.dark1};

    &:after { 
      display: none;
    }
  }
`;