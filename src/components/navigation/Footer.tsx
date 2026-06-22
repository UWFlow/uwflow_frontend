import React from 'react';
import FadeIn from 'react-fade-in';
import { GitHub } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import {
  ABOUT_PAGE_ROUTE,
  isOnLandingPageRoute,
  LANDING_PAGE_ROUTE,
  PRIVACY_PAGE_ROUTE,
} from 'Routes';

// Shared footer link styling (replaces the old Body + Hover styled mixins).
const linkClasses =
  'font-inter text-md font-regular text-light2 no-underline whitespace-nowrap ' +
  'cursor-pointer transition-all duration-100 ease-in ' +
  'hover:brightness-[.85] focus:brightness-[.85]';

// margin: 16px 16px 0 0 on the smallest screens, matching the old layout.
const rightLinkClasses = `${linkClasses} ml-8 max-[500px]:mt-4 max-[500px]:mr-4 max-[500px]:ml-0`;

const Footer = () => {
  const location = useLocation();
  const onLanding = isOnLandingPageRoute(location);

  return (
    <FadeIn delay={1000} className="relative z-0 w-screen [&>div]:flex">
      <div
        className={`flex w-full items-center bg-primaryExtraDark h-fit min-h-[70px] ${
          onLanding ? 'mt-0' : 'mt-8'
        }`}
      >
        <div className="flex w-full justify-between mx-auto px-8 tabletDown:p-4 max-[500px]:flex-col">
          <div className="flex items-center">
            <a
              href="https://github.com/UWFlow/uwflow/releases/tag/v1.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClasses} inline-flex items-center gap-2 mr-8`}
            >
              <GitHub size={16} />
              We&apos;re open source!
            </a>
            <Link to={LANDING_PAGE_ROUTE} className={`${linkClasses} mr-8`}>
              Home
            </Link>
            <Link to={ABOUT_PAGE_ROUTE} className={`${linkClasses} mr-8`}>
              About
            </Link>
            <Link to={PRIVACY_PAGE_ROUTE} className={`${linkClasses} mr-8`}>
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.fb.com/planyourflow"
              target="_blank"
              rel="noopener noreferrer"
              className={rightLinkClasses}
            >
              Facebook
            </a>
            <a
              href="mailto:info@uwflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className={rightLinkClasses}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default Footer;
