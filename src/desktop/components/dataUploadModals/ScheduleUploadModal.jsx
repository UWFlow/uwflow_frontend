import React, { useState } from 'react';
import ModalHOC from '../../../components/modal/ModalHOC';
import { withTheme } from 'styled-components';
import { makePOSTRequest } from '../../../utils/Api';
import { ArrowRight, Clipboard } from 'react-feather';

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
  SchedulePasteBox,
  GreyText,
  PrivacyPolicyWrapper,
  PrivacyPolicyText,
  PrivacyPolicyLink,
  SkipStepWrapper,
} from './styles/DataUploadModals';

/* Constants */
import { SCHEDULE_PARSE_ENDPOINT } from '../../../constants/Api';
import {
  UPLOAD_PENDING,
  AWAITING_UPLOAD,
  UPLOAD_FAILED,
  UPLOAD_SUCCESSFUL,
} from '../../../constants/DataUploadStates';

const ScheduleUploadModal = ({ onCloseModal, isModalOpen, theme }) => {
  const [uploadState, setUploadState] = useState(AWAITING_UPLOAD);

  const handleSchedulePaste = async event => {
    /* TODO: handle schedule paste */
    console.log(event.currentTarget.value);
    setUploadState(UPLOAD_PENDING);
    const [response, status] = await makePOSTRequest(SCHEDULE_PARSE_ENDPOINT, {
      text: event.currentTarget.value,
    });
    if (status == 200) {
      setUploadState(UPLOAD_SUCCESSFUL);
    } else {
      setUploadState(UPLOAD_FAILED);
    }
  };

  return (
    <ModalHOC onCloseModal={onCloseModal} isModalOpen={isModalOpen}>
      <ContentWrapper>
        <Header>Import your schedule from Quest</Header>
        <table>
          <tbody>
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
                <ArrowRight color={theme.accent} height={100} width={80} />
              </td>
              <td>
                <ScheduleStep2Picture />
              </td>
              <td>
                <ArrowRight color={theme.accent} height={100} width={80} />
              </td>
              <td>
                <ScheduleStep3Wrapper>
                  <SchedulePasteBoxWrapper>
                    <SchedulePasteBoxBackground>
                      <Clipboard height={100} width={60} color={theme.dark3} />
                      <GreyText>Paste here! (Ctrl+V)</GreyText>
                    </SchedulePasteBoxBackground>
                    <SchedulePasteBox
                      type="text"
                      value=""
                      onChange={handleSchedulePaste}
                    />
                  </SchedulePasteBoxWrapper>
                  <PrivacyPolicyWrapper>
                    <PrivacyPolicyText>Check out our</PrivacyPolicyText>
                    <PrivacyPolicyLink>privacy policy</PrivacyPolicyLink>
                  </PrivacyPolicyWrapper>
                </ScheduleStep3Wrapper>
              </td>
            </tr>
          </tbody>
        </table>
        <SkipStepWrapper>skip this step ></SkipStepWrapper>
      </ContentWrapper>
    </ModalHOC>
  );
};

export default withTheme(ScheduleUploadModal);
