import FadeIn from 'react-fade-in';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  AWAITING_UPLOAD,
  DataUploadState,
  UPLOAD_PENDING,
  UPLOAD_SUCCESSFUL,
} from 'constants/DataUploadStates';
import {
  Body,
  BoxShadow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Hover,
} from 'constants/Mixins';

export const ContentWrapper = styled(FadeIn)`
  display: flex;
  flex-direction: column;
  background: white;
  ${BoxShadow}
  padding: 32px;
  margin: 0 auto;
  border-radius: 4px;
  width: max-content;
  max-width: 100%;
  box-sizing: border-box;

  @media only screen and (max-width: 800px) {
    width: 100%;
    padding: 16px;
  }
`;

export const ContentSteps = styled.div`
  display: flex;
  height: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
    align-items: center;
  }
`;

export const ArrowWrapper = styled.div`
  margin: auto;

  @media only screen and (max-width: 800px) {
    margin: 8px auto;
    transform: rotate(90deg);
  }
`;

export const Header = styled.div`
  ${Heading2}
  margin-bottom: 64px;

  @media only screen and (max-width: 800px) {
    margin-bottom: 24px;
    text-align: center;
  }
`;

export const InstructionWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  margin-bottom: 16px;
  min-height: 80px;

  @media only screen and (max-width: 800px) {
    max-width: 100%;
    min-height: 0;
  }
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
  ${Hover()}
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
  padding: 3px 1px 0 0;

  @media only screen and (max-width: 800px) {
    height: 48px;
    width: 48px;
    min-width: 48px;
    border-radius: 24px;
    font-size: 24px;
  }
`;

export const ScheduleStepPicture = styled.img`
  height: 300px;
  width: 300px;
  background: ${({ theme }) => theme.light4};
  border-radius: 4px;

  @media only screen and (max-width: 800px) {
    height: auto;
    width: 100%;
    max-width: 300px;
  }
`;

export const ScheduleStep3Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    width: 100%;
    align-items: center;
  }
`;

export const SchedulePasteBoxWrapper = styled.div<{
  uploadState: DataUploadState;
}>`
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

  ${Hover()}

  @media only screen and (max-width: 800px) {
    width: 100%;
    max-width: 300px;
  }
`;

export const SchedulePasteBox = styled.textarea<{ error: boolean }>`
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
  color: ${({ theme }) => theme.dark2};
  text-decoration: underline;
  margin: 0 4px;
  cursor: pointer;
`;

export const SkipStepWrapper = styled.div`
  ${Heading4}
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.primary};
  margin-top: 48px;
  cursor: pointer;
  ${Hover(true)}
`;

export const LongInstructionWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin-bottom: 16px;
  min-height: 64px;

  @media only screen and (max-width: 800px) {
    max-width: 100%;
    min-height: 0;
  }
`;

export const TranscriptStep1Video = styled.video`
  height: 400px;
  width: 500px;
  background: ${({ theme }) => theme.light4};
  border-radius: 4px;

  @media only screen and (max-width: 800px) {
    height: auto;
    width: 100%;
    max-width: 500px;
  }
`;

export const TranscriptUploadBox = styled.div<{ uploadState: DataUploadState }>`
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

  ${Hover()}

  @media only screen and (max-width: 800px) {
    width: 100%;
    max-width: 500px;
    height: 240px;
  }
`;

export const TranscriptPrivacyPolicyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 500px;

  @media only screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  padding: 2px 2px 4px 4px;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.red};
`;
