import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ArrowRight, Clipboard } from 'react-feather';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { PRIVACY_PAGE_ROUTE } from 'Routes';
import { useTheme } from 'styled-components';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { BACKEND_ENDPOINT, SCHEDULE_PARSE_ENDPOINT } from 'constants/Api';
import {
  AWAITING_UPLOAD,
  DataUploadState,
  UPLOAD_FAILED,
  UPLOAD_PENDING,
  UPLOAD_SUCCESSFUL,
} from 'constants/DataUploadStates';
import { DATA_UPLOAD_SUCCESS, SCHEDULE_ERRORS } from 'constants/Messages';
import Step1Image from 'img/upload/calendar-step-1.png';
import Step2Image from 'img/upload/calendar-step-2.png';
import {
  ErrorResponse,
  ParseOnlyScheduleResponse,
  ScheduleParseBody,
  ScheduleParseResponse,
} from 'types/Api';
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

// TODO: the regexes below are brittle and should be expected to need changes.
// They pattern-match Quest's rendered page copy — UI text and layout UW can
// reword at any time, with no versioning and no notice, and which differs
// between the undergrad and grad views. They were tuned against 883 captured
// pastes on 2026-07-27 (see PR #287); that sample is a snapshot of one term's
// Quest, not a contract.
//
// What keeps this acceptable is the blast radius: this function only picks an
// error *string*. Nothing here affects what gets parsed or saved, so a pattern
// that goes stale degrades to a vaguer message, never to a bad import. When one
// does start misfiring, prefer deleting the specific case over hand-tuning the
// pattern — a generic message beats a confidently wrong one. See the TODO on
// getScheduleError below for the fix that removes the guesswork entirely.

// Quest prints this on My Class Schedule when the term has no enrolments. The
// paste is well-formed, so it is not a copy/paste error — the term is empty.
const notRegisteredRegex = /you are not registered for classes in this term/i;

// Match the Course Selection page by its own name ("View My Course Selection"
// tab, "My Course Selection" heading) rather than by "Course Selection", which
// also appears in the "Go To" nav on *every* page ("Course Selection (Undergrad
// only)") and on the Enrollment Dates page ("Course Selection Session").
const courseSelectionRegex = /my course selection/i;

// Mirrors the backend's term regex (api/parse/schedule/schedule.go). A paste
// that starts below Quest's term header has nothing for it to match, which is
// the only way /parse/schedule can answer `bad_request` for a real paste.
const termHeaderRegex = /(Spring|Fall|Winter)\s+\d{4}/;

/**
 * Picks the error message for a failed `/parse/schedule` response. The backend
 * reports only a coarse enum; we still have the pasted text, so we disambiguate
 * here and tell the user which kind of bad paste they sent.
 *
 * TODO: this belongs in the backend. `schedule.Parse` knows exactly why it
 * failed, and re-deriving that from the paste means the two regexes have to
 * stay in sync by hand. Give the missing-term-header and Course Selection cases
 * their own `serde` enums (like `empty_schedule` / `old_schedule`) and have the
 * frontend key off `error` alone. Frontend-only for now so the message ships
 * without a backend deploy.
 */
export const getScheduleError = (error: string, pastedSchedule: string) => {
  if (error === 'empty_schedule') {
    if (notRegisteredRegex.test(pastedSchedule)) {
      return SCHEDULE_ERRORS.not_registered_schedule;
    }
    if (courseSelectionRegex.test(pastedSchedule)) {
      return SCHEDULE_ERRORS.course_selection_schedule;
    }
    return SCHEDULE_ERRORS.empty_schedule;
  }

  if (error === 'bad_request' && !termHeaderRegex.test(pastedSchedule)) {
    return SCHEDULE_ERRORS.no_term_schedule;
  }

  return SCHEDULE_ERRORS[error] || SCHEDULE_ERRORS.default_schedule;
};

export type ScheduleUploadModalContentProps = {
  onAfterUploadSuccess?: (data?: ParseOnlyScheduleResponse) => void;
  onSkip?: () => void;
  showSkipStepButton?: boolean;
};

const ScheduleUploadModalContent = ({
  showSkipStepButton = false,
  onAfterUploadSuccess = () => {},
  onSkip = () => {},
}: ScheduleUploadModalContentProps) => {
  const theme = useTheme();

  const [uploadState, setUploadState] =
    useState<DataUploadState>(AWAITING_UPLOAD);
  const [scheduleText, setScheduleText] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleSchedulePaste = async (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const pastedSchedule = event.currentTarget.value;
    setScheduleText(pastedSchedule);

    if (pastedSchedule === '') {
      return;
    }

    setUploadState(UPLOAD_PENDING);
    const [response, status] = await makeAuthenticatedPOSTRequest<
      ScheduleParseBody,
      ScheduleParseResponse | ErrorResponse
    >(
      `${BACKEND_ENDPOINT}${SCHEDULE_PARSE_ENDPOINT}?user_id=${localStorage.getItem(
        'user_id',
      )}`,
      {
        text: pastedSchedule,
      },
    );

    if (status === 200 && !(response as ScheduleParseResponse).failed_classes) {
      await sleep(500);
      setUploadState(UPLOAD_SUCCESSFUL);
      toast(DATA_UPLOAD_SUCCESS);
      if (onAfterUploadSuccess) {
        const parseOnly = response as unknown as ParseOnlyScheduleResponse;
        onAfterUploadSuccess(
          parseOnly.TermId !== undefined ? parseOnly : undefined,
        );
      }
      onSkip();
    } else {
      setUploadState(UPLOAD_FAILED);

      // Forward term-schedule upload failures (this is the Quest schedule paste
      // flow, not the transcript parser) to Sentry so we can diagnose why a
      // user's schedule could not be imported. Covers backend error enums
      // (empty/old/default schedule), non-200 responses, and class numbers that
      // failed to match a section.
      Sentry.captureException(
        new Error(
          `Schedule upload failed: ${
            (response as ErrorResponse).error ?? 'classes_failed'
          }`,
        ),
        {
          tags: { feature: 'schedule_upload' },
          extra: {
            status,
            error: (response as ErrorResponse).error,
            failedClasses: (response as ScheduleParseResponse).failed_classes,
            // The exact text the user pasted, so we can reproduce parse failures.
            schedule: pastedSchedule,
          },
        },
      );

      if ((response as ErrorResponse).error) {
        const errorRes = response as ErrorResponse;
        setUploadError(getScheduleError(errorRes.error, pastedSchedule));
      } else {
        const scheduleRes = response as ScheduleParseResponse;
        setUploadError(
          SCHEDULE_ERRORS.classes_failed(scheduleRes.failed_classes),
        );
        onAfterUploadSuccess();
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
              and click &quot;Class Schedule&quot;
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

export default ScheduleUploadModalContent;
