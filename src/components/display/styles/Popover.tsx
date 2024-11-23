import Tippy from '@tippyjs/react';
import styled from 'styled-components';

import { Body } from 'constants/Mixins';

import 'tippy.js/dist/tippy.css';

export const PopoverWrapper = styled(Tippy)`
  ${Body}
  background: ${({ theme }) => theme.light1} !important;
  border: 1px solid ${({ theme }) => theme.light3};
  padding: 2px;
  border-radius: 4px !important;
  max-width: 200px;
  color: ${({ theme }) => theme.dark1} !important;
  white-space: normal;
  opacity: 0.98;
  font-size: 16px !important;

  /* Style the arrow */
  .tippy-arrow {
    color: ${({ theme }) => theme.light3}; /* Border color */
  }

  /* Style the arrow's inner fill */
  .tippy-arrow:before {
    color: ${({ theme }) => theme.light3}; /* Border color */
  }
`;
