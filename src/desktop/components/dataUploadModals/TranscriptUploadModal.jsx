import React, { useEffect } from 'react';
import ModalHOC from '../../../basicComponents/modal/ModalHOC';
import { withTheme } from 'styled-components';

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
  RightArrow,
  UploadIcon,
  GreyText,
  TranscriptPrivacyPolicyWrapper,
  PrivacyPolicyHeader,
  PrivacyPolicyText,
  PrivacyPolicyLink,
  SkipStepWrapper,
} from './styles/DataUploadModals';

const privacyText = `
  Flow only uses your transcript so you can easily import your course
  history and leave reviews for courses you have taken. See our`;

const preventDefault = event => event.preventDefault();

const onDragOver = event => {
  event.stopPropagation();
  event.preventDefault();
};

const TranscriptUploadModal = ({ onCloseModal, isModalOpen, theme }) => {
  const handleTranscriptDrop = event => {
    /* TODO: handle schedule paste */
    console.log(event.dataTransfer);
    event.preventDefault();
    event.stopPropagation();
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
                <RightArrow />
              </td>
              <td>
                <ScheduleStep3Wrapper>
                  <form onDrop={handleTranscriptDrop} onDragOver={onDragOver}>
                    <TranscriptUploadBox>
                      <UploadIcon />
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
