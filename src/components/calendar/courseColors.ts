// One hue per course, replacing the old colour-by-section-type scheme: the
// section type is already spelled out in each block's label ("LEC 001"),
// while the course had no visual identifier at all.
export type CourseColor = {
  /** Saturated left rail. */
  rail: string;
  /** Opaque pastel block fill. */
  fill: string;
  /** Translucent fill for preview ghosts, which sit over real blocks. */
  previewFill: string;
};

// Full class strings so Tailwind's JIT scanner picks them up. Gold is left out
// on purpose (it marks the selected block on the swap page), and so is grey —
// a grey block reads as disabled next to the coloured ones.
export const COURSE_COLORS: CourseColor[] = [
  {
    rail: 'border-primary',
    fill: 'bg-[#f0f6ff]',
    previewFill: 'bg-[#f0f6ff]/60',
  },
  {
    rail: 'border-[#36b37e]',
    fill: 'bg-[#ebf9f3]',
    previewFill: 'bg-[#ebf9f3]/60',
  },
  {
    rail: 'border-[#6554c0]',
    fill: 'bg-[#f2f0fc]',
    previewFill: 'bg-[#f2f0fc]/60',
  },
  {
    rail: 'border-[#ff8b00]',
    fill: 'bg-[#fff4e6]',
    previewFill: 'bg-[#fff4e6]/60',
  },
  {
    rail: 'border-[#2b8fcd]',
    fill: 'bg-[#f0fdff]',
    previewFill: 'bg-[#f0fdff]/60',
  },
  {
    rail: 'border-[#d83ba0]',
    fill: 'bg-[#fdeff8]',
    previewFill: 'bg-[#fdeff8]/60',
  },
  {
    rail: 'border-[#de350b]',
    fill: 'bg-[#fdefeb]',
    previewFill: 'bg-[#fdefeb]/60',
  },
];

// Blocks with no course key (rare — every caller passes a course code).
export const DEFAULT_COURSE_COLOR: CourseColor = {
  rail: 'border-dark3',
  fill: 'bg-[#eaecef]',
  previewFill: 'bg-[#eaecef]/60',
};

const hash = (value: string) => {
  let acc = 7;
  for (let i = 0; i < value.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    acc = (acc * 31 + value.charCodeAt(i)) | 0;
  }
  return acc;
};

/**
 * Map course keys to palette slots. The hash keeps a course's colour stable as
 * the user pages through weeks or terms; colliding courses take the next free
 * slot so everything visible at once stays distinguishable. Keys are sorted so
 * the result doesn't depend on the order events arrive in.
 */
export const assignCourseColors = (
  keys: string[],
): Map<string, CourseColor> => {
  const used = new Set<number>();
  const colors = new Map<string, CourseColor>();

  Array.from(new Set(keys))
    .sort()
    .forEach((key) => {
      let slot = Math.abs(hash(key)) % COURSE_COLORS.length;
      while (used.size < COURSE_COLORS.length && used.has(slot)) {
        slot = (slot + 1) % COURSE_COLORS.length;
      }
      used.add(slot);
      colors.set(key, COURSE_COLORS[slot]);
    });

  return colors;
};
