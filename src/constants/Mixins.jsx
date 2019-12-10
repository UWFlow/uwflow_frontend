import {
  PAGE_CONTENT_WIDTH,
  FOOTER_HEIGHT,
  FOOTER_MARGIN_TOP,
  NAVBAR_HEIGHT,
} from './PageConstants';
import theme from './GlobalTheme';

export const PageContentZIndex = 'z-index: -1;';

export const PageWrapper = `
  min-height: calc(100vh - ${FOOTER_HEIGHT}px - ${FOOTER_MARGIN_TOP}px);
  display: flex;
  flex-direction: column;
  padding-top: ${NAVBAR_HEIGHT}px;
`;

export const PageContent = `
  max-width: ${PAGE_CONTENT_WIDTH}px;
  width: 100%;
  margin: 0 auto;

  padding-left: 32px;
  padding-right: 32px;

  @media only screen and (max-width: ${theme.breakpoints.tablet}px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ModalZIndex = 'z-index: 2000;';

export const WideColumn = `
  display: flex;
  flex-direction: column;
  padding-right: 32px;
  width: 70%;
`;

export const ThinColumn = `
  display: flex;
  flex-direction: column;
  width: 30%;
`;

/* Fonts */
export const Heading1 = `
  font-family: 'Anderson Grotesk';
  font-size: 40px;
  font-weight: 800;

  @media only screen and (max-width: ${theme.breakpoints.tablet}px) {
    font-size: 32px;
  }
`;

export const Heading2 = `
  font-family: 'Anderson Grotesk';
  font-size: 32px;
  font-weight: 800;

  @media only screen and (max-width: ${theme.breakpoints.tablet}px) {
    font-size: 28px;
  }
`;

export const Heading3 = `
  font-family: 'Anderson Grotesk';
  font-size: 20px;
  font-weight: 600;
`;

export const Heading4 = `
  font-family: 'Anderson Grotesk';
  font-size: 18px;
  font-weight: 600;
`;

export const Body = `
  font-family: 'Inter';
  font-weight: 400;
  font-size: 15px;
`;

export const Small = `
  font-weight: 300;
  font-size: 14px;
`;

export const Link = `
  font-weight: 600;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  width: fit-content;
`;

export const BoxShadow = `
  box-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5),
  0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const DarkBoxShadow = `
  box-shadow: 0px 0px 10px ${theme.primaryExtraDark}
`;

export const TextShadow = `
  text-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5),
  0px 0px 5px rgba(142, 147, 148, 0.2);
`;

export const Card = (padding = '32px', margin = '0') => `
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  border-radius: 4px;
  padding: ${padding};
  margin: ${margin};
  background-color: white;
`;
