import React from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';

import {
  BubbleRatingsWrapper,
  Thumb,
  ThumbsWrapper,
  UnitCircle,
} from './styles/BubbleRatings';

type ThumbsProps = {
  boolRating: boolean;
};

const Thumbs = ({ boolRating }: ThumbsProps) => (
  <ThumbsWrapper>
    <Thumb colored={boolRating === true}>
      <ThumbsUp width={20} height={20} strokeWidth={3} fill="white" />
    </Thumb>
    <Thumb colored={boolRating === false}>
      <ThumbsDown width={20} height={20} strokeWidth={3} fill="white" />
    </Thumb>
  </ThumbsWrapper>
);

type CirclesProps = {
  rating: number;
  total: number;
};

const Circles = ({ rating, total }: CirclesProps) => (
  <>
    {Array.apply(null, Array(total)).map((_, ind) => {
      return <UnitCircle key={ind} filled={ind < rating} diameter={16} />;
    })}
  </>
);

type BubbleRatingsProps = {
  total: number;
  rating: number;
  boolRating?: boolean;
};

const BubbleRatings = ({ total, rating, boolRating }: BubbleRatingsProps) => {
  return (
    <BubbleRatingsWrapper>
      {boolRating === true || boolRating === false ? (
        <Thumbs boolRating={boolRating} />
      ) : (
        <Circles rating={rating + 1} total={total} />
      )}
    </BubbleRatingsWrapper>
  );
};

export default BubbleRatings;
