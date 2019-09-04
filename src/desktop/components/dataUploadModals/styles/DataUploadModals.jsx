import styled from 'styled-components';
import {
  Heading1,
  Heading2,
  Heading3,
  BoxShadow,
  Heading4,
  Body,
} from '../../../../constants/Mixins';
import { ArrowRight, Clipboard, Upload } from 'react-feather';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  ${BoxShadow}
  padding: 32px;
  margin: 32px 0;
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

export const Link = styled.span`
  color: blue;
  text-decoration: underline;
  margin: 0 6px;
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
  background: ${({ theme }) => theme.accentDark};
`;

export const ScheduleStep1Picture = styled.div`
  height: 300px;
  width: 300px;
  background: gray;
`;

export const ScheduleStep2Picture = styled.div`
  height: 300px;
  width: 300px;
  background: gray;
`;

export const ScheduleStep3Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SchedulePasteBoxWrapper = styled.div`
  position: relative;
`;

export const ClipboardIcon = styled(Clipboard)`
  height: 100px;
  width: 60px;
  color: ${({ theme }) => theme.dark3};
`;

export const SchedulePasteBoxBackground = styled.div`
  height: 280px;
  width: 300px;
  background: ${({ theme }) => theme.light2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
`;

export const SchedulePasteBox = styled.input`
  height: 280px;
  width: 300px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  border-radius: 5px;
  border: 3px solid ${({ theme }) => theme.accent};

  &:hover {
    border: 3px solid ${({ theme }) => theme.accentDark};
  }
`;

export const GreyText = styled.div`
  color: ${({ theme }) => theme.dark3};
  ${Heading4}
  max-width: 160px;
`;

export const RightArrow = styled(ArrowRight)`
  color: ${({ theme }) => theme.accent};
  width: 80px;
  height: 100px;
  stroke-width: 3px;
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

export const PrivacyPolicyLink = styled.span`
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
  background: gray;
`;

export const TranscriptUploadBox = styled.div`
  height: 318px;
  width: 500px;
  background: ${({ theme }) => theme.light2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  border: 3px solid ${({ theme }) => theme.accent};

  &:hover {
    border: 3px solid ${({ theme }) => theme.accentDark};
  }
`;

export const UploadIcon = styled(Upload)`
  height: 100px;
  width: 60px;
  color: ${({ theme }) => theme.dark3};
`;

export const TranscriptPrivacyPolicyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 500px;
`;
