import { ReactNode } from 'react';

import 'recharts';

declare module 'recharts' {
  interface PieProps {
    children?: ReactNode;
  }
}
