import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { Body } from '../../../constants/Mixins';

export const TooltipWrapper = styled(ReactTooltip)`
  &.type-dark {
    ${Body}
    background-color: ${({ theme }) => theme.light1};
    border: 2px solid ${({ theme }) => theme.light3};
    padding: 8px;
    border-radius: 4px;
    max-width: 200px;
    color: ${({ theme }) => theme.dark1};
    white-space: normal;

    &:after {
      display: none;
    }
  }
`;
