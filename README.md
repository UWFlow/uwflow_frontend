# UW Flow 2.0 Frontend
[![CircleCI](https://circleci.com/gh/AyushK1/uwflow2.0_frontend.svg?style=svg&circle-token=f0c3958442810fd3a81b0a45af6b873fa1022a5f)](https://circleci.com/gh/AyushK1/uwflow2.0_frontend)

## Contributing

* Before contributing, look over the [React][https://reactjs.org/] and [Apollo Client](https://www.apollographql.com/docs/react/) documentation
* Fork this repository [send a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) from your branch for review
* The `npm run format` command is run automatically when pushing
  * Amend your commit (`git commit --amend`) with any formatting changes and push them to your branch as well
* Include a short description of your changes and try to make it easy for reviewers to provide feedback

### UI Changes
* Include screenshots for both desktop and mobile if there are UI changes

## Style Guide

### Naming
* `UpperCamelCase` for component and class names
* `lowerCamelCase` for variable and method names

### Styling
* Create new [Styled Component](https://styled-components.com/) classes for any component requiring styles
* Check `Mixins.jsx` for common styles that can be reused in your component
* Common styles include heading and body text, box shadows, hover animations and cards
* Only use colors found in the `GlobalTheme.jsx` file by accessing the `theme` prop in your Styled Components 

### Structure
* Components for specific pages are found within their respective page folders
* Commonly used functions and utilities are defined in the `utils` folder
* Global constants are defined in the `constants` folder
* GraphQL fragments, queries and mutations are defined in the `graphql` folder

## Frontend Setup

1. Clone the repository
2. `npm install` to install dependencies
3. `npm start` to run the server locally at [localhost:3000](localhost:3000)

## Building for Production

1. `npm run lint` to check that there are no linter errors, otherwise the site will not compile
2. `npm run build` to create a new production build in the `build` folder

## Interacting with the Backend

* Set up backend Docker containers and run them locally
* To interact with the API server properly, run your browser with CORS disabled
* Running Chrome without CORS:
  * MacOS - `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`
  * Windows 10 - `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
  * Linux - `google-chrome --disable-web-security`
