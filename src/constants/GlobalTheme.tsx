import { keyframes } from 'styled-components';

import {
  BREAKPOINT_WIDTH,
  FOOTER_HEIGHT,
  FOOTER_MARGIN_TOP,
  PAGE_CONTENT_WIDTH,
} from './PageConstants';

const primaryExtraDark = '#042049';
const white = '#ffffff';

const breakpoints = {
  zero: 0,
  mobileLarge: 600,
  tablet: BREAKPOINT_WIDTH,
  desktop: PAGE_CONTENT_WIDTH,
};

const fontFamily = {
  inter:
    'Inter, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif',
  anderson:
    "'Anderson Grotesk', -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif",
};

const fontSize = {
  xs: '12px',
  s: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  heading2Mobile: '28px',
  heading2: '32px',
  heading1: '40px',
};

const fontWeight = {
  light: 300,
  regular: 400,
  semibold: 600,
  extrabold: 800,
};

const zIndex = {
  pageContent: -1,
  modal: 2000,
};

const borderRadius = {
  card: '4px',
};

const shadows = {
  box: `0px 2px 5px rgba(236, 237, 237, 0.4),
    0px 0px 5px rgba(142, 147, 148, 0.2)`,
  darkBox: `0px 0px 10px ${primaryExtraDark}`,
  bottomBox: `0px 1px 3px rgba(236, 237, 237, 0.4),
    0px 1px 3px rgba(142, 147, 148, 0.2)`,
  text: `0px 2px 5px rgba(236, 237, 237, 0.4),
    0px 0px 5px rgba(142, 147, 148, 0.2)`,
};

const transitions = {
  hoverDuration: '0.1s',
  hoverTimingFunction: 'ease-in',
};

const hoverBrightness = {
  default: '85%',
  dark: '60%',
};

const layout = {
  pageMinHeight: `calc(100vh - ${FOOTER_HEIGHT}px - ${FOOTER_MARGIN_TOP}px)`,
  pageContentWidth: `${PAGE_CONTENT_WIDTH}px`,
  pagePadding: '32px',
  wideColumnWidth: '70%',
  thinColumnWidth: '30%',
};

const typography = {
  heading1: `
    font-family: ${fontFamily.anderson};
    font-size: ${fontSize.heading1};
    font-weight: ${fontWeight.extrabold};

    @media only screen and (max-width: ${breakpoints.tablet}px) {
      font-size: ${fontSize.heading2};
    }
  `,
  heading2: `
    font-family: ${fontFamily.anderson};
    font-size: ${fontSize.heading2};
    font-weight: ${fontWeight.extrabold};

    @media only screen and (max-width: ${breakpoints.tablet}px) {
      font-size: ${fontSize.heading2Mobile};
    }
  `,
  heading3: `
    font-family: ${fontFamily.anderson};
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.semibold};
  `,
  heading4: `
    font-family: ${fontFamily.anderson};
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.semibold};
  `,
  body: `
    font-family: ${fontFamily.inter};
    font-weight: ${fontWeight.regular};
    font-size: ${fontSize.md};
  `,
  small: `
    font-weight: ${fontWeight.light};
    font-size: ${fontSize.s};
  `,
};

const hoverTransition = (target = 'all', time = transitions.hoverDuration) => `
  transition: ${target} ${time} ${transitions.hoverTimingFunction};
`;

const hover = (darker = false) => `
  ${hoverTransition()}
  &:hover, &:focus {
    cursor: pointer;
    filter: brightness(${
      darker ? hoverBrightness.dark : hoverBrightness.default
    });
  }
`;

const mixins = {
  pageContentZIndex: `z-index: ${zIndex.pageContent};`,
  pageWrapper: `
    min-height: ${layout.pageMinHeight};
    display: flex;
    flex-direction: column;
    padding-bottom: ${layout.pagePadding};
    width: 100vw;
  `,
  pageContent: `
    max-width: ${layout.pageContentWidth};
    width: 100%;
    margin: 0 auto;

    padding-left: ${layout.pagePadding};
    padding-right: ${layout.pagePadding};

    @media only screen and (max-width: ${breakpoints.tablet - 1}px) {
      padding-left: 0;
      padding-right: 0;
    }
  `,
  modalZIndex: `z-index: ${zIndex.modal};`,
  wideColumn: `
    display: flex;
    flex-direction: column;
    padding-right: ${layout.pagePadding};
    width: ${layout.wideColumnWidth};
  `,
  thinColumn: `
    display: flex;
    flex-direction: column;
    width: ${layout.thinColumnWidth};
  `,
  hoverTransition,
  hover,
  link: `
    font-weight: ${fontWeight.semibold};
    font-size: ${fontSize.md};
    text-decoration: underline;
    cursor: pointer;
    width: fit-content;
    ${hover(true)}
  `,
  boxShadow: `
    box-shadow: ${shadows.box};
  `,
  darkBoxShadow: `
    box-shadow: ${shadows.darkBox};
  `,
  bottomBoxShadow: `
    box-shadow: ${shadows.bottomBox};
  `,
  textShadow: `
    text-shadow: ${shadows.text};
  `,
  card: (padding = layout.pagePadding, margin = '0') => `
    display: flex;
    flex-direction: column;
    border-radius: ${borderRadius.card};
    width: 100%;
    border-radius: ${borderRadius.card};
    padding: ${padding};
    margin: ${margin};
    background-color: ${white};
  `,
};

const animations = {
  fadeIn: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,
};

export default {
  /* Colours */
  primary: '#0052cc',
  primaryDark: '#0747a6',
  primaryExtraDark,
  courses: '#ff8b00',
  professors: '#36b37e',
  accent: '#ffc400',
  accentDark: '#e8b300',

  dark1: '#172b4d',
  dark2: '#505f79',
  dark3: '#97a0af',

  light1: '#f4f5f7',
  light2: '#ebecf0',
  light3: '#dfe1e5',
  light4: '#c6c9c9',

  lecture: '#b3d4ff',
  lab: '#b3f3ff',
  tutorial: '#c0b6f2',

  white,
  red: '#ff5630',
  darkRed: '#de350b',

  google: '#4285f4',
  facebook: '#3c5a99',

  transparent: 'rgba(0,0,0,0)',

  breakpoints,

  fontFamily,
  fontSize,
  fontWeight,
  zIndex,
  borderRadius,
  shadows,
  transitions,
  hoverBrightness,
  layout,
  typography,
  mixins,
  animations,
};
