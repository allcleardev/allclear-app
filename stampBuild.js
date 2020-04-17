const fs = require('fs');

// add these if needed later
// const { resolve } = require('path');
// let packageJSON;
// try {
//   packageJSON = require(resolve(__dirname, './package.json'));
// } catch (err) {
//   console.log('cant find packageJSON', err);
// }

// const version = packageJSON ? packageJSON.version : 'NA-Version';
// const name = packageJSON ? packageJSON.name : 'NA-name';

const date = new Date();
const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

if (process.env.GIT_BRANCH === 'master') {
  const baseURL = 'https://api.allclear.app';
} else if (process.env.GIT_BRANCH === 'staging') {
  const baseURL = 'https://api-staging.allclear.app';
} else {
  const baseURL = 'https://api-dev.allclear.app';
}

// read env file
const envfile = require('envfile');
let envFileParsed = envfile.parseFileSync('.env');

// write new variables to env file for FE consumption
envFileParsed.REACT_APP_BUILT_AT = `${fullDate} - ${time}`;
envFileParsed.REACT_APP_BASE_URL = baseURL;
fs.writeFileSync('./.env', envfile.stringifySync(envFileParsed));
