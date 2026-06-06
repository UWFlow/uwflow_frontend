/**
 * Tailwind class equivalents for constants/Mixins.
 *
 * Use these when migrating markup from styled-components. Runtime values such
 * as custom card spacing should be composed with additional static classes.
 */
export const InterFont = 'font-inter';
export const AndersonFont = 'font-anderson';

export const PageContentZIndex = 'z-page-content';
export const PageWrapper = 'flex min-h-page w-screen flex-col pb-page';
export const PageContent = 'mx-auto w-full max-w-page px-page max-[799px]:px-0';
export const ModalZIndex = 'z-modal';
export const WideColumn = 'flex w-wide-column flex-col pr-page';
export const ThinColumn = 'flex w-thin-column flex-col';

export const Heading1 =
  'font-anderson text-heading-1 font-extrabold max-[800px]:text-heading-2';
export const Heading2 =
  'font-anderson text-heading-2 font-extrabold max-[800px]:text-heading-2-mobile';
export const Heading3 = 'font-anderson text-xl font-semibold';
export const Heading4 = 'font-anderson text-lg font-semibold';
export const Body = 'font-inter text-md font-regular';
export const Small = 'text-s font-light';

export const HoverTransition = 'transition-all duration-hover ease-hover';

export const Hover = (darker = false) =>
  `${HoverTransition} hover:cursor-pointer focus:cursor-pointer ${
    darker
      ? 'hover:brightness-hover-dark focus:brightness-hover-dark'
      : 'hover:brightness-hover focus:brightness-hover'
  }`;

export const Link = `w-fit cursor-pointer text-md font-semibold underline ${Hover(
  true,
)}`;

export const BoxShadow = 'shadow-box';
export const DarkBoxShadow = 'shadow-dark-box';
export const BottomBoxShadow = 'shadow-bottom-box';
export const TextShadow = 'text-shadow';

// Additional padding and margin variants should be composed at the call site.
export const Card = 'm-0 flex w-full flex-col rounded-card bg-white p-page';

export const FadeInAnimation = 'animate-fade-in';
