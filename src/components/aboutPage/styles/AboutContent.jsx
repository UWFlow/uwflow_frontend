import styled from 'styled-components';
import { Heading4, Body } from '../../../constants/Mixins';

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const PageBodyHeader = styled.div`
  ${Heading4}
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  margin-bottom: 32px;
`;
