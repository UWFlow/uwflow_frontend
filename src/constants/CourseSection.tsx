/** Quest section_name prefix — the component type of a course section. */
export enum SectionType {
  // theoretical components
  LEC = 'LEC', // lecture: the usual lecture format.
  OLN = 'OLN', // online: rare term for online lectures. [ACINTY]
  RDG = 'RDG', // reading: independent study under ~1-1 supervision. [CS 690B in 1201]
  // interactive components
  CLN = 'CLN', // clinic: analysis of cases. [OPTOM, PHARM]
  DIS = 'DIS', // discussion: group discussions under supervision. [PSCI 231]
  ORL = 'ORL', // oral conversation: practicing a foreign language. [FR 192]
  SEM = 'SEM', // seminar: less formal lecture + project/paper presentations. [SE 101]
  // practical components
  ESS = 'ESS', // essay: just writing essays, apparently... [ENGL 495]
  FLD = 'FLD', // field studies: work with primary materials in the field. [EARTH 260]
  FLT = 'FLT', // flight training: planes! [AVIA]
  LAB = 'LAB', // laboratory: practical tasks, often with special equipment. [ECE 240]
  PRA = 'PRA', // practicum: supervised placement in a work setting. [SWREN]
  PRJ = 'PRJ', // project: the student independently produces a deliverable. [WKRPT]
  STU = 'STU', // studio: coaching based on applied skill execution. [FINE 100]
  WRK = 'WRK', // work term: co-op. [COOP]
  WSP = 'WSP', // workshop: independent project work under supervision [SVENT]
  // supplementary components
  TUT = 'TUT', // tutorial: usually a TA going over sample problems.
  // examination components
  ENS = 'ENS', // ensemble: evaluation of musical performance. [MUSIC]
  TST = 'TST', // test: usually mid-term exam.
}

// Aliases kept for existing course/profile schedule imports.
export const LEC = SectionType.LEC;
export const LAB = SectionType.LAB;
export const TUT = SectionType.TUT;

// All section codes in the order they should appear in a course schedule.
export const SECTION_CODES = Object.values(SectionType);

// Maps each section code to its index in SECTION_CODES.
export const SECTION_ORDER = SECTION_CODES.reduce(
  (map: { [key: string]: number }, type, i) => {
    map[type] = i;
    return map;
  },
  {},
);

/** Section "type" is the section_name prefix: "LEC 001" -> LEC. */
export const getSectionType = (sectionName: string): SectionType =>
  sectionName.split(' ')[0] as SectionType;
