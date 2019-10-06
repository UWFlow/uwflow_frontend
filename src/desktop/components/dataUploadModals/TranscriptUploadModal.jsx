import React, { useEffect, useState } from 'react';
import ModalHOC from '../../../basicComponents/modal/ModalHOC';
import { withTheme } from 'styled-components';
import { makePOSTRequest } from '../../../utils/Api';
import { ArrowRight, Upload } from 'react-feather';

/* Styled Components */
import {
  ContentWrapper,
  Header,
  LongInstructionWrapper,
  NumberCircle,
  InstructionText,
  Link,
  TranscriptStep1Picture,
  ScheduleStep3Wrapper,
  TranscriptUploadBox,
  GreyText,
  TranscriptPrivacyPolicyWrapper,
  PrivacyPolicyHeader,
  PrivacyPolicyText,
  PrivacyPolicyLink,
  SkipStepWrapper,
} from './styles/DataUploadModals';

/* Constants */
import { TRANSCRIPT_PARSE_ENDPOINT } from '../../../constants/Api';
import {
  AWAITING_UPLOAD,
  UPLOAD_PENDING,
  UPLOAD_SUCCESSFUL,
  UPLOAD_FAILED,
} from '../../../constants/DataUploadStates';

const privacyText = `
  Flow only uses your transcript so you can easily import your course
  history and leave reviews for courses you have taken. See our`;

const preventDefault = event => event.preventDefault();

const onDragOver = event => {
  event.stopPropagation();
  event.preventDefault();
};

const TranscriptUploadModal = ({ onCloseModal, isModalOpen, theme }) => {
  const [uploadState, setUploadState] = useState(AWAITING_UPLOAD);

  const handleTranscriptDrop = async event => {
    /* TODO: handle schedule paste */
    console.log(event.dataTransfer.files);
    event.preventDefault();
    event.stopPropagation();
    setUploadState(UPLOAD_PENDING);
    const [response, status] = await makePOSTRequest(
      TRANSCRIPT_PARSE_ENDPOINT,
      {
        file: event.dataTransfer.files,
      },
    );
    if (status == 200) {
      setUploadState(UPLOAD_SUCCESSFUL);
    } else {
      setUploadState(UPLOAD_FAILED);
    }
  };

  useEffect(() => {
    window.addEventListener('dragover', preventDefault, false);
    window.addEventListener('drop', preventDefault, false);

    return () => {
      window.removeEventListener('dragover', preventDefault);
      window.removeEventListener('drop', preventDefault);
    };
  }, []);

  return (
    <ModalHOC onCloseModal={onCloseModal} isModalOpen={isModalOpen}>
      <ContentWrapper>
        <Header>Upload your transcript</Header>
        <table>
          <tbody>
            <tr>
              <td>
                <LongInstructionWrapper>
                  <NumberCircle>1</NumberCircle>
                  <InstructionText>
                    Follow the
                    <Link>instructions here</Link>
                    to download your transcript as a PDF file
                  </InstructionText>
                </LongInstructionWrapper>
              </td>
              <td />
              <td>
                <LongInstructionWrapper>
                  <NumberCircle>2</NumberCircle>
                  <InstructionText>Upload your transcript file</InstructionText>
                </LongInstructionWrapper>
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <TranscriptStep1Picture />
              </td>
              <td>
                <ArrowRight color={theme.accent} height={100} width={80} />
              </td>
              <td>
                <ScheduleStep3Wrapper>
                  <form
                    onDrop={handleTranscriptDrop}
                    onDragOver={onDragOver}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <TranscriptUploadBox>
                      <Upload height={100} width={60} color={theme.dark3} />
                      <GreyText>
                        Drag and drop your transcript file here!
                      </GreyText>
                    </TranscriptUploadBox>
                  </form>
                  <TranscriptPrivacyPolicyWrapper>
                    <PrivacyPolicyHeader>
                      We do not store your grades.
                    </PrivacyPolicyHeader>
                    <PrivacyPolicyText>
                      {privacyText}
                      <PrivacyPolicyLink>privacy policy</PrivacyPolicyLink>
                      for more information
                    </PrivacyPolicyText>
                  </TranscriptPrivacyPolicyWrapper>
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

export default withTheme(TranscriptUploadModal);
