import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import {
  Heading1,
  Heading2,
  Heading3,
  BoxShadow,
  Heading4,
  Body,
} from '../../../constants/Mixins';
import {
  AWAITING_UPLOAD,
  UPLOAD_PENDING,
  UPLOAD_SUCCESSFUL,
} from '../../../constants/DataUploadStates';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  ${BoxShadow}
  padding: 32px;
  margin: 48px auto;
  border-radius: 4px;
  width: max-content;
`;

export const ContentSteps = styled.div`
  display: flex;
  height: 100%;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowWrapper = styled.div`
  margin: auto;
`;

export const Header = styled.div`
  ${Heading2}
  margin-bottom: 64px;
`;

export const InstructionWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  margin-bottom: 16px;
`;

export const InstructionText = styled.div`
  ${Heading3}
  margin-left: 16px;
`;

export const Link = styled.a`
  ${Heading3}
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
  margin: 0 4px;
  cursor: pointer;
`;

export const NumberCircle = styled.div`
  ${Heading1}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  min-width: 64px;
  border-radius: 32px;
  background: ${({ theme }) => theme.accent};
`;

export const ScheduleStepPicture = styled.div`
  height: 300px;
  width: 300px;
  background: ${({ theme }) => theme.light4};
  border-radius: 4px;
`;

export const ScheduleStep3Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SchedulePasteBoxWrapper = styled.div`
  position: relative;
  height: 280px;
  width: 300px;
  background: ${({ theme }) => theme.light2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4px;
  background: ${({ theme }) => theme.light2};
  border: 3px solid
    ${({ theme, uploadState }) =>
      uploadState === AWAITING_UPLOAD || uploadState === UPLOAD_PENDING
        ? theme.accent
        : uploadState === UPLOAD_SUCCESSFUL
        ? theme.primary
        : theme.red};

  &:hover {
    background: ${({ theme }) => theme.light3};
  }
`;

export const SchedulePasteBox = styled.textarea`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  resize: none;
  border: none;
  background: none;
  padding: ${({ error }) => (error ? '64px 8px 8px 8px' : '8px')};
`;

export const GreyText = styled.div`
  color: ${({ theme }) => theme.dark3};
  ${Heading4}
  max-width: 160px;
`;

export const PrivacyPolicyWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;

export const PrivacyPolicyHeader = styled.div`
  ${Heading4}
  color: ${({ theme }) => theme.dark2}
`;

export const PrivacyPolicyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3}
`;

export const PrivacyPolicyLink = styled(RouterLink)`
  ${Body}
  color: ${({ theme }) => theme.dark2}
  text-decoration: underline;
  margin: 0 4px;
  cursor: pointer;
`;

export const SkipStepWrapper = styled.div`
  align-self: flex-end;
  color: ${({ theme }) => theme.dark3};
  margin-top: 24px;
  cursor: pointer;
`;

export const LongInstructionWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin-bottom: 16px;
`;

export const TranscriptStep1Picture = styled.div`
  height: 400px;
  width: 500px;
  background: ${({ theme }) => theme.light4};
  border-radius: 4px;
`;

export const TranscriptUploadBox = styled.div`
  height: 318px;
  width: 500px;
  cursor: pointer;
  background: ${({ theme }) => theme.light2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4px;
  border: 3px solid
    ${({ theme, uploadState }) =>
      uploadState === AWAITING_UPLOAD || uploadState === UPLOAD_PENDING
        ? theme.accent
        : uploadState === UPLOAD_SUCCESSFUL
        ? theme.primary
        : theme.red};

  &:hover {
    background: ${({ theme }) => theme.light3};
  }
`;

export const TranscriptPrivacyPolicyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 500px;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  padding: 2px 2px 4px 4px;
  width: 100%;
  top: 0;
  left: 0;
  right: 0
  z-index: 2;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.red};
`;
