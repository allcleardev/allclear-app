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

const envfile = require('envfile');
let envFileParsed = envfile.parseFileSync('.env');
envFileParsed.REACT_APP_BUILT_AT = `${fullDate} - ${time}`;
fs.writeFileSync('./.env', envfile.stringifySync(envFileParsed));
