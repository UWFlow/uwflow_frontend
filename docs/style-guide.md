# Style Guide

## Naming

File names should reflect these rules as well.

- `UpperCamelCase` for component and class names (except hooks)
- `lowerCamelCase` for hooks, variable and method names

## Styling

- Create new [Styled Component](https://styled-components.com/) classes for any component requiring styles
- Check `Mixins.tsx` for common styles that can be reused in your component
- Common styles include heading and body text, box shadows, hover animations and cards
- Only use colors found in the `GlobalTheme.tsx` file by accessing the `theme` prop in your Styled Components

## Hooks

- Always use hooks when available instead of an HOC
- eg) React Router, Apollo, Styled Components, etc.

## Types

- Avoid explicitly using the `any` type
- If you see any component using an explicit `any` type, try to clean it up when possible
