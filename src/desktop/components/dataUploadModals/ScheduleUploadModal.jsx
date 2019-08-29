import React from 'react';
import ModalHOC from '../common/modal/ModalHOC';
import { ArrowRight } from 'react-feather';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  ContentWrapper,
  Header,
  InstructionWrapper,
  NumberCircle,
  InstructionText,
  Link,
  ScheduleStep1Picture,
  ScheduleStep2Picture,
  ScheduleStep3Wrapper,
  SchedulePasteBoxWrapper,
  SchedulePasteBoxBackground,
  RightArrow,
  ClipboardIcon,
  GreyText,
  PrivacyPolicyWrapper,
  PrivacyPolicyText,
  PrivacyPolicyLink,
} from './styles/DataUploadModals';

const ScheduleUploadModal = ({ onCloseModal, isModalOpen, theme }) => {
  return (
    <ModalHOC onCloseModal={onCloseModal} isModalOpen={isModalOpen}>
      <ContentWrapper>
        <Header>Import your schedule from Quest</Header>
        <table>
          <tr>
            <td>
              <InstructionWrapper>
                <NumberCircle>1</NumberCircle>
                <InstructionText>
                  <Link>Login to Quest</Link>
                  and click "Enroll"
                </InstructionText>
              </InstructionWrapper>
            </td>
            <td />
            <td>
              <InstructionWrapper>
                <NumberCircle>2</NumberCircle>
                <InstructionText>
                  Pick your term then select all (Ctrl+A) and copy (Ctrl+C)
                </InstructionText>
              </InstructionWrapper>
            </td>
            <td />
            <td>
              <InstructionWrapper>
                <NumberCircle>3</NumberCircle>
                <InstructionText>Paste into the box below</InstructionText>
              </InstructionWrapper>
            </td>
          </tr>
          <tr>
            <td>
              <ScheduleStep1Picture />
            </td>
            <td>
              <RightArrow />
            </td>
            <td>
              <ScheduleStep2Picture />
            </td>
            <td>
              <RightArrow />
            </td>
            <td>
              <ScheduleStep3Wrapper>
                <SchedulePasteBoxWrapper>
                  <SchedulePasteBoxBackground>
                    <ClipboardIcon />
                    <GreyText>Paste here! (Ctrl+V)</GreyText>
                  </SchedulePasteBoxBackground>
                </SchedulePasteBoxWrapper>
                <PrivacyPolicyWrapper>
                  <PrivacyPolicyText>Check out our</PrivacyPolicyText>
                  <PrivacyPolicyLink>privacy policy</PrivacyPolicyLink>
                </PrivacyPolicyWrapper>
              </ScheduleStep3Wrapper>
            </td>
          </tr>
        </table>
      </ContentWrapper>
    </ModalHOC>
  );
};

export default withTheme(ScheduleUploadModal);
