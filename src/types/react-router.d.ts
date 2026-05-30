/* eslint-disable import/no-extraneous-dependencies */
import { ReactNode } from 'react';

import 'react-router';

declare module 'react-router' {
  interface RouterProps {
    children?: ReactNode;
  }
}
