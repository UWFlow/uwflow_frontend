export const termCodeToDate = code => {
  const monthInt = code % 10;
  const year = 1900 + Math.floor(code / 10);
  const month = monthInt === 1 ? 'Winter' : monthInt === 5 ? 'Spring' : 'Fall';
  return `${month} ${year}`;
};

export const SPLIT_COURSE_CODE_REGEX = /[a-zA-Z]{2,}|[0-9]+/gi;

export const splitCourseCode = (code) => {
  if (code === '') {
    return code;
  }

  let codeLetters = '';
  let i = 0;
  while (i < code.length && code[i].toUpperCase() >= 'A' && code[i].toUpperCase() <= 'Z') {
    codeLetters += code[i].toUpperCase();
    i++;
  }

  return [codeLetters, code.slice(i)].join(' ');
};