import styled from 'styled-components';
import { Heading3, Body } from '../../../constants/Mixins';

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const PageBodyHeader = styled.div`
  ${Heading3}
  margin-bottom: 4px;
`;

export const PageBodyParagraph = styled.div`
  ${Body}
  line-height: 1.2;
  margin-bottom: 32px;
`;
