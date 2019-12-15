import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { makeAuthenticatedPOSTRequest } from '../../utils/Api';
import { ArrowRight, Clipboard } from 'react-feather';

/* Styled Components */
import {
  ContentWrapper,
  Header,
  InstructionWrapper,
  NumberCircle,
  InstructionText,
  Link,
  ScheduleStepPicture,
  ScheduleStep3Wrapper,
  SchedulePasteBoxWrapper,
  SchedulePasteBox,
  GreyText,
  PrivacyPolicyWrapper,
  PrivacyPolicyText,
  PrivacyPolicyLink,
  SkipStepWrapper,
  ErrorMessage,
} from './styles/DataUploadModals';

/* Child Components */
import LoadingSpinner from '../display/LoadingSpinner';

/* Constants */
import { SCHEDULE_PARSE_ENDPOINT, BACKEND_ENDPOINT } from '../../constants/Api';
import {
  UPLOAD_PENDING,
  AWAITING_UPLOAD,
  UPLOAD_FAILED,
  UPLOAD_SUCCESSFUL,
} from '../../constants/DataUploadStates';

import { PRIVACY_PAGE_ROUTE } from '../../Routes';

export const ScheduleUploadModalContent = ({ onSkip, theme }) => {
  const [uploadState, setUploadState] = useState(AWAITING_UPLOAD);
  const [scheduleText, setScheduleText] = useState('');

  const handleSchedulePaste = async event => {
    setScheduleText(event.currentTarget.value);
    setUploadState(UPLOAD_PENDING);
    const [, status] = await makeAuthenticatedPOSTRequest(
      `${BACKEND_ENDPOINT}${SCHEDULE_PARSE_ENDPOINT}?user_id=${localStorage.getItem(
        'user_id',
      )}`,
      {
        text: event.currentTarget.value,
      },
    );
    if (status === 200) {
      setUploadState(UPLOAD_SUCCESSFUL);
    } else {
      setUploadState(UPLOAD_FAILED);
    }
  };

  const uploadContent = () => {
    if (uploadState === UPLOAD_PENDING) {
      return <LoadingSpinner />;
    }

    if (uploadState === UPLOAD_SUCCESSFUL) {
      return <GreyText>Successfully uploaded schedule!</GreyText>;
    }

    return (
      <>
        <SchedulePasteBox
          type="text"
          value={scheduleText}
          onChange={handleSchedulePaste}
        />
        {uploadState === UPLOAD_FAILED && (
          <ErrorMessage>Invalid schedule</ErrorMessage>
        )}
        <Clipboard height={100} width={60} color={theme.dark3} />
        <GreyText>Paste here! (Ctrl+V)</GreyText>
      </>
    );
  };

  return (
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
              <ScheduleStepPicture />
            </td>
            <td>
              <ArrowRight color={theme.accent} height={100} width={80} />
            </td>
            <td>
              <ScheduleStepPicture />
            </td>
            <td>
              <ArrowRight color={theme.accent} height={100} width={80} />
            </td>
            <td>
              <ScheduleStep3Wrapper>
                <SchedulePasteBoxWrapper uploadState={uploadState}>
                  {uploadContent()}
                </SchedulePasteBoxWrapper>
                <PrivacyPolicyWrapper>
                  <PrivacyPolicyText>Check out our</PrivacyPolicyText>
                  <PrivacyPolicyLink to={PRIVACY_PAGE_ROUTE}>
                    privacy policy
                  </PrivacyPolicyLink>
                </PrivacyPolicyWrapper>
              </ScheduleStep3Wrapper>
            </td>
          </tr>
        </tbody>
      </table>
      <SkipStepWrapper onClick={onSkip}>skip this step ></SkipStepWrapper>
    </ContentWrapper>
  );
};

export default withTheme(ScheduleUploadModalContent);
