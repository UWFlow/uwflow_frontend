/** @jest-environment jsdom-fourteen */
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  PROFILE_PAGE_ROUTE,
  SHARED_CLASSES_PAGE_ROUTE,
  SWAP_PAGE_ROUTE,
} from 'Routes';
import { ThemeProvider } from 'styled-components';

import theme from 'constants/GlobalTheme';
import { logOut } from 'utils/Auth';

import ProfileDropdown from './ProfileDropdown';

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: () => true,
  useDispatch: () => mockDispatch,
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({ pathname: '/shared-classes' }),
}));
jest.mock('@apollo/client', () => ({
  ...jest.requireActual<typeof import('@apollo/client')>('@apollo/client'),
  useQuery: () => ({ loading: false, data: { user: [{ id: 1 }] } }),
}));
jest.mock('hooks/useModal', () => () => [jest.fn()]);
jest.mock('utils/Auth', () => ({ logOut: jest.fn() }));

describe('profile menu', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    Object.assign(global, { IS_REACT_ACT_ENVIRONMENT: true });
    Element.prototype.scrollIntoView = jest.fn();
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(
        <ThemeProvider theme={theme}>
          <ProfileDropdown />
        </ThemeProvider>,
      );
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const openWithKeyboard = async () => {
    const trigger = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Profile menu"]',
    );
    if (!trigger) throw new Error('Profile menu trigger is missing');
    await act(async () => {
      trigger.focus();
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
    });
    return trigger;
  };

  it.each([
    ['View profile', PROFILE_PAGE_ROUTE],
    ['Swap Class', SWAP_PAGE_ROUTE],
    ['Shared Classes', SHARED_CLASSES_PAGE_ROUTE],
    ['Log out', null],
  ])('opens with the keyboard and activates %s', async (label, route) => {
    await openWithKeyboard();
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[role="menuitem"]'),
    );
    expect(items.map((item) => item.textContent)).toEqual([
      'View profile',
      'Swap Class',
      'Shared Classes',
      'Log out',
    ]);
    const item = items.find((candidate) => candidate.textContent === label);
    if (!item) throw new Error(`Missing menu item: ${label}`);
    await act(async () => {
      item.click();
    });
    if (route) {
      expect(mockPush).toHaveBeenCalledWith(route);
      expect(logOut).not.toHaveBeenCalled();
    } else {
      expect(logOut).toHaveBeenCalledWith(mockDispatch, true);
      expect(mockPush).not.toHaveBeenCalled();
    }
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });

  it('dismisses with Escape and restores focus to the trigger', async () => {
    const trigger = await openWithKeyboard();
    await act(async () => {
      document.activeElement?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    });
    // Radix restores focus in a timer after the portal unmounts.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(mockPush).not.toHaveBeenCalled();
    expect(logOut).not.toHaveBeenCalled();
  });
});
