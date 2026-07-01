import React from 'react';
import { Award } from 'react-feather';

import { TRANSCRIPT_UPLOAD_MODAL } from 'constants/Modal';
import useModal from 'hooks/useModal';
import { computeGpa, computeTermGpas, TranscriptGradeStore } from 'utils/Gpa';
import { termCodeToDate } from 'utils/Misc';

type GpaCardProps = {
  gradeStore: TranscriptGradeStore | null;
  onAfterUploadSuccess: () => void;
};

const GpaCard = ({ gradeStore, onAfterUploadSuccess }: GpaCardProps) => {
  const [openModal, closeModal] = useModal();

  const cumulativeGpa = gradeStore
    ? computeGpa(Object.values(gradeStore))
    : null;
  const termGpas = gradeStore ? computeTermGpas(gradeStore) : [];

  return (
    <div className="rounded-lg bg-white p-md shadow-box">
      <div className="mb-sm flex items-center gap-xs text-sm text-dark2">
        <Award size={16} />
        GPA · OMSAS 4.0 scale
      </div>
      {cumulativeGpa === null ? (
        <>
          <p className="m-0 mb-sm text-xs leading-normal text-dark2">
            Upload your transcript to calculate your GPA. Your grades never
            leave this browser — we don&apos;t store them.
          </p>
          <button
            type="button"
            className="cursor-pointer rounded border-none bg-accent px-md py-sm text-sm font-semibold text-dark1 transition-[filter] duration-100 ease-in hover:brightness-95"
            onClick={() =>
              openModal(TRANSCRIPT_UPLOAD_MODAL, {
                onAfterUploadSuccess,
                onSkip: () => closeModal(TRANSCRIPT_UPLOAD_MODAL),
              })
            }
          >
            Upload transcript
          </button>
        </>
      ) : (
        <>
          <div className="text-2xl font-semibold text-dark1">
            {cumulativeGpa.toFixed(2)}
          </div>
          <div className="mb-sm text-xs text-dark3">
            cumulative, credit-weighted
          </div>
          <div className="flex flex-col gap-xs">
            {termGpas.map(({ termId, gpa }) => (
              <div
                key={termId}
                className="flex justify-between text-xs text-dark2"
              >
                <span>{termCodeToDate(termId)}</span>
                <span className="font-semibold text-dark1">
                  {gpa.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GpaCard;
