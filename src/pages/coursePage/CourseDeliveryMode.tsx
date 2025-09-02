import React from 'react';
import { CourseInfoFragment } from 'generated/graphql';

import { formatCourseCode } from 'utils/Misc';

import {
  DeliveryModeWrapper,
  GreyText,
  Header,
  LineOfText,
} from './styles/CourseDeliveryMode';

type CourseDeliveryModeProps = {
  courseCode: string;
  deliveryMode?: CourseInfoFragment['delivery_mode'];
};

const CourseDeliveryMode = ({
  courseCode,
  deliveryMode = null,
}: CourseDeliveryModeProps) => {
  const getDeliveryModeDescription = (mode: string | null): string => {
    switch (mode) {
      case 'online_only':
        return 'All sections of this course are offered online.';
      case 'in_person_only':
        return 'All sections of this course are offered in person.';
      case 'both':
        return 'This course offers both online and in-person sections.';
      default:
        return 'Delivery mode information is not available for this course.';
    }
  };

  return (
    <DeliveryModeWrapper>
      <Header>{`${formatCourseCode(courseCode)} delivery mode`}</Header>
      {deliveryMode ? (
        <LineOfText>
          <GreyText>{getDeliveryModeDescription(deliveryMode)}</GreyText>
        </LineOfText>
      ) : (
        <LineOfText>
          <GreyText>Delivery mode not available</GreyText>
        </LineOfText>
      )}
    </DeliveryModeWrapper>
  );
};

export default CourseDeliveryMode;
