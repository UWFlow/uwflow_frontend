export const randBetween = (start, end) => {
  return Math.random() * (end - start) + start;
};

export const randIntBetween = (start, end) => {
  return Math.floor(randBetween(start, end));
};

export const shouldDoWithProbablity = probability => {
  return Math.random() < probability;
};

export const pickOneRandomly = set => {
  const n = Math.random();
  let accumulator = 0;
  for (const key of Object.keys(set)) {
    accumulator += set[key];
    if (accumulator > n) {
      return key;
    }
  }
  return null;
};
