import kitten_1 from '../img/kittens/kitten_1.png';
import kitten_2 from '../img/kittens/kitten_2.png';
import kitten_3 from '../img/kittens/kitten_3.png';
import kitten_4 from '../img/kittens/kitten_4.png';
import kitten_5 from '../img/kittens/kitten_5.png';
import kitten_6 from '../img/kittens/kitten_6.png';
import kitten_7 from '../img/kittens/kitten_7.png';
import kitten_8 from '../img/kittens/kitten_8.png';
import kitten_9 from '../img/kittens/kitten_9.png';
import kitten_10 from '../img/kittens/kitten_10.png';
import kitten_11 from '../img/kittens/kitten_11.png';
import kitten_12 from '../img/kittens/kitten_12.png';
import kitten_13 from '../img/kittens/kitten_13.png';
import { randIntBetween } from './Random';

const kittens = [
  kitten_1,
  kitten_2,
  kitten_3,
  kitten_4,
  kitten_5,
  kitten_6,
  kitten_7,
  kitten_8,
  kitten_9,
  kitten_10,
  kitten_11,
  kitten_12,
  kitten_13,
];

export const getKittenFromUserID = id => kittens[id % 13];

export const getRandomKitten = () => kittens[randIntBetween(0, 14)];

export const hashProgram = program => {
  var hash = 0;
  if (!program || program.length === 0) return 0;
  for (let i = 0; i < program.length; i++) {
    const chr = program.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const getKittenFromProgram = program => {
  if (!program) return getRandomKitten();
  return kittens[Math.abs(hashProgram(program)) % 13];
};
