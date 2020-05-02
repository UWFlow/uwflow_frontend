# UW Flow 2.0 Frontend
[![CircleCI](https://circleci.com/gh/AyushK1/uwflow2.0_frontend.svg?style=svg&circle-token=f0c3958442810fd3a81b0a45af6b873fa1022a5f)](https://circleci.com/gh/AyushK1/uwflow2.0_frontend)

## Frontend Setup

1. clone the repository
2. `yarn install` to install dependencies
3. `yarn start` to run the server locally at [localhost:3000](localhost:3000)

## Building for Production

1. `yarn lint` to check that there are no linter errors, otherwise the site will not compile
2. `yarn build` to create a new production build in the `build` folder

## Interacting with the Backend

* Run the backend Docker containers locally
* To interact with the API server properly, the browser needs to have CORS disabled
* To run Chrome without CORS
  * MacOS - `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`
  * Windows 10 - `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
  * Linux - `google-chrome --disable-web-security`
