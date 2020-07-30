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

## Folder Structure

`components`

- Common components used across pages
- Contains a variety of subfolders grouped by function

`constants`

- Global constants

`data`

- Data related functions such as Redux reducers and actions

`generated`

- Generated GraphQL types

`graphql`

- GraphQL fragments, queries and mutations

`hooks`

- Custom React hooks

`img`

- Images and other media files

`pages`

- Pages and page-specific components

`search`

- Search bar related components

`types`

- TypeScript type definitions and overrides for missing type packages

`utils`

- Common functions and utilities
