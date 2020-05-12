const fs = require('fs');

const date = new Date();
const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
const time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

let baseURL;

if (process.env.GIT_BRANCH === 'master') {
  baseURL = 'https://api.allclear.app';
} else if (process.env.GIT_BRANCH === 'staging') {
  baseURL = 'https://api-staging.allclear.app';
  generateRobots();
} else {
  baseURL = 'https://api-dev.allclear.app';
  generateRobots();
}

// read env file
const envfile = require('envfile');
let envFileParsed = envfile.parseFileSync('.env');

// write new variables to env file for FE consumption
envFileParsed.REACT_APP_BUILT_AT = `${fullDate} - ${time}`;
envFileParsed.REACT_APP_BASE_URL = baseURL;
fs.writeFileSync('./.env', envfile.stringifySync(envFileParsed));

function generateRobots() {
  const robotsTxt =
    `User-agent: *
Disallow: /`;
  fs.writeFileSync('./public/robots.txt', robotsTxt);
}

