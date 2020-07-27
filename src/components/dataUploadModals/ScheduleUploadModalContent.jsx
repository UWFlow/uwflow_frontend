import React, { useState } from 'react';
import { ArrowRight, Clipboard } from 'react-feather';
import { toast } from 'react-toastify';
import { PRIVACY_PAGE_ROUTE } from 'Routes';
import { withTheme } from 'styled-components';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { BACKEND_ENDPOINT, SCHEDULE_PARSE_ENDPOINT } from 'constants/Api';
import {
  AWAITING_UPLOAD,
  UPLOAD_FAILED,
  UPLOAD_PENDING,
  UPLOAD_SUCCESSFUL,
} from 'constants/DataUploadStates';
import { DATA_UPLOAD_SUCCESS, SCHEDULE_ERRORS } from 'constants/Messages';
import Step1Image from 'img/upload/calendar-step-1.png';
import Step2Image from 'img/upload/calendar-step-2.png';
import { makeAuthenticatedPOSTRequest } from 'utils/Api';
import { sleep } from 'utils/Misc';

import {
  ArrowWrapper,
  ContentSteps,
  ContentWrapper,
  ErrorMessage,
  GreyText,
  Header,
  InstructionText,
  InstructionWrapper,
  Link,
  NumberCircle,
  PrivacyPolicyLink,
  PrivacyPolicyText,
  PrivacyPolicyWrapper,
  SchedulePasteBox,
  SchedulePasteBoxWrapper,
  ScheduleStep3Wrapper,
  ScheduleStepPicture,
  SkipStepWrapper,
  StepWrapper,
} from './styles/DataUploadModals';

// keys for only allowing copy paste / deletion
const clipboardKeys = {
  winInsert: 45,
  winDelete: 46,
  SelectAll: 97,
  macCopy: 99,
  macPaste: 118,
  macCut: 120,
  redo: 121,
  undo: 122,
};

const ScheduleUploadModalContent = ({
  onSkip,
  theme,
  showSkipStepButton = false,
  onAfterUploadSuccess = () => {},
}) => {
  const [uploadState, setUploadState] = useState(AWAITING_UPLOAD);
  const [scheduleText, setScheduleText] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleSchedulePaste = async (event) => {
    setScheduleText(event.currentTarget.value);

    if (event.currentTarget.value === '') {
      return;
    }

    setUploadState(UPLOAD_PENDING);
    const [response, status] = await makeAuthenticatedPOSTRequest(
      `${BACKEND_ENDPOINT}${SCHEDULE_PARSE_ENDPOINT}?user_id=${localStorage.getItem(
        'user_id',
      )}`,
      {
        text: event.currentTarget.value,
      },
    );
    if (status === 200 && !response.failed_classes) {
      await sleep(500);
      setUploadState(UPLOAD_SUCCESSFUL);
      toast(DATA_UPLOAD_SUCCESS);
      if (onAfterUploadSuccess) {
        onAfterUploadSuccess();
      }
      onSkip();
    } else {
      setUploadState(UPLOAD_FAILED);
      if (response.error) {
        setUploadError(
          SCHEDULE_ERRORS[response.error] || SCHEDULE_ERRORS.default_schedule,
        );
      } else {
        setUploadError(
          SCHEDULE_ERRORS.classes_failed(response.failed_classes.length),
        );
        onAfterUploadSuccess();
      }
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which;
    if (
      !(
        (event.ctrlKey && charCode === clipboardKeys.redo) ||
        (event.ctrlKey && charCode === clipboardKeys.undo) ||
        (event.ctrlKey && charCode === clipboardKeys.macCut) ||
        (event.ctrlKey && charCode === clipboardKeys.macPaste) ||
        (event.ctrlKey && charCode === clipboardKeys.macCopy) ||
        (event.shiftKey && event.keyCode === clipboardKeys.winInsert) ||
        (event.shiftKey && event.keyCode === clipboardKeys.winDelete) ||
        (event.ctrlKey && event.keyCode === clipboardKeys.winInsert) ||
        (event.ctrlKey && charCode === clipboardKeys.SelectAll)
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const uploadContent = () => {
    if (uploadState === UPLOAD_PENDING) {
      return <LoadingSpinner />;
    }

    return (
      <>
        <SchedulePasteBox
          type="text"
          value={scheduleText}
          onChange={handleSchedulePaste}
          onKeyPress={handleKeyPress}
          error={uploadState === UPLOAD_FAILED}
        />
        {uploadState === UPLOAD_FAILED && (
          <ErrorMessage>{uploadError}</ErrorMessage>
        )}
        <Clipboard height={100} width={60} color={theme.dark3} />
        <GreyText>Paste here! (Ctrl+V)</GreyText>
      </>
    );
  };

  return (
    <ContentWrapper>
      <Header>Import your schedule from Quest</Header>
      <ContentSteps>
        <StepWrapper>
          <InstructionWrapper>
            <NumberCircle>1</NumberCircle>
            <InstructionText>
              <Link
                href="https://quest.pecs.uwaterloo.ca/psp/SS/ACADEMIC/SA/?cmd=login&languageCd=ENG"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login to Quest
              </Link>
              and click &quot;Enroll&quot;
            </InstructionText>
          </InstructionWrapper>
          <ScheduleStepPicture
            src={Step1Image}
            alt="Login to Quest schedule upload step"
          />
        </StepWrapper>

        <ArrowWrapper>
          <ArrowRight color={theme.accent} height={100} width={80} />
        </ArrowWrapper>

        <StepWrapper>
          <InstructionWrapper>
            <NumberCircle>2</NumberCircle>
            <InstructionText>
              Pick your term then select all (Ctrl+A) and copy (Ctrl+C)
            </InstructionText>
          </InstructionWrapper>
          <ScheduleStepPicture
            src={Step2Image}
            alt="Copy all Quest schedule step"
          />
        </StepWrapper>

        <ArrowWrapper>
          <ArrowRight color={theme.accent} height={100} width={80} />
        </ArrowWrapper>

        <StepWrapper>
          <InstructionWrapper>
            <NumberCircle>3</NumberCircle>
            <InstructionText>Paste into the box below</InstructionText>
          </InstructionWrapper>
          <ScheduleStep3Wrapper>
            <SchedulePasteBoxWrapper uploadState={uploadState}>
              {uploadContent()}
            </SchedulePasteBoxWrapper>
            <PrivacyPolicyWrapper>
              <PrivacyPolicyText>Check out our</PrivacyPolicyText>
              <PrivacyPolicyLink to={PRIVACY_PAGE_ROUTE} onClick={onSkip}>
                privacy policy
              </PrivacyPolicyLink>
            </PrivacyPolicyWrapper>
          </ScheduleStep3Wrapper>
        </StepWrapper>
      </ContentSteps>
      {showSkipStepButton && (
        <SkipStepWrapper onClick={onSkip}>skip this step &gt;</SkipStepWrapper>
      )}
    </ContentWrapper>
  );
};

export default withTheme(ScheduleUploadModalContent);
