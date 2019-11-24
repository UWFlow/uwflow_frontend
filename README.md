# UW Flow 2.0 Frontend

## Frontend Setup

1. clone the repository
2. `npm install` to install dependencies
3. `npm start` to run the server locally at [localhost:3000](localhost:3000)

## Building for Production

1. `npm run lint` to check that there are no linter errors, otherwise the site will not compile
2. `npm run build` to create a new production build in the `build` folder

## Interacting with the Backend

* In general, make sure the backend docker containers are running locally
* To interact with the api server, the browser needs to have CORS disabled
  * Running Chrome without CORS:
    * MacOS - `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`
    * Windows 10 - `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp`
    * Linux - `google-chrome --disable-web-security`
