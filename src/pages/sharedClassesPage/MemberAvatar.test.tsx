/** @jest-environment jsdom-fourteen */
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import theme from 'constants/GlobalTheme';
import { getKittenFromID } from 'utils/Kitten';

import { GroupMember } from './api';
import MemberAvatar from './MemberAvatar';

describe('shared class member avatar', () => {
  let container: HTMLDivElement;
  let root: Root;
  const member: GroupMember = {
    user_id: 1,
    name: 'Armaan Sengupta',
    status: 'member',
  };

  beforeEach(() => {
    Object.assign(global, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const render = (value = member) => {
    act(() => {
      root.render(
        <ThemeProvider theme={theme}>
          <MemberAvatar member={value} />
        </ThemeProvider>,
      );
    });
  };

  it('uses the same cat as the class card and reveals the name on focus', () => {
    render();
    const photo = container.querySelector('img')!;
    expect(photo.getAttribute('src')).toBe(getKittenFromID(member.user_id));
    expect(photo.alt).toBe(member.name);
    const avatar = container.querySelector<HTMLElement>('[tabindex="0"]')!;
    act(() => avatar.focus());
    expect(document.querySelector('[role="tooltip"]')?.textContent).toBe(
      member.name,
    );
  });
});
