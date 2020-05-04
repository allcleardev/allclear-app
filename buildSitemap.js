const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const axios = require('axios');

let baseURL;
let appUrl;

if (process.env.GIT_BRANCH === 'master') {
  baseURL = 'https://api.allclear.app';
  appUrl = 'https://go.allclear.app';
} else if (process.env.GIT_BRANCH === 'staging') {
  baseURL = 'https://api-staging.allclear.app';
  appUrl = 'https://app-staging.allclear.app';
} else {
  baseURL = 'https://api-dev.allclear.app';
  appUrl = 'https://app-dev.allclear.app';
}

function getFacilities() {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: `${baseURL}/facilities/search`,
    data: {}
  });
}

async function build() {
  try {
    const smStream = new SitemapStream({ hostname: appUrl });

    smStream.write({ url: '/map'});
    smStream.write({ url: '/contact-tracing'});
    smStream.write({ url: '/create-account'});
    smStream.write({ url: '/state-list'});

    const facilitiesResponse = await getFacilities();

    let stateMap = {};
    if (facilitiesResponse.data && facilitiesResponse.data.records) {
      facilitiesResponse.data.records.forEach((record) => {
        if (!stateMap[record.state]) {
          stateMap[record.state] = {
            cities: {}
          };
        }

        if (!stateMap[record.state].cities[record.city]) {
          stateMap[record.state].cities[record.city] = [];
        }

        stateMap[record.state].cities[record.city].push(record.id);
      });

      for (let stateKey in stateMap) {
        smStream.write({ url: '/locations/' + stateKey});

        for (let cityKey in stateMap[stateKey].cities) {
          smStream.write({ url: '/locations/' + stateKey + '/' + cityKey});

          stateMap[stateKey].cities[cityKey].forEach((location) => {
            smStream.write({ url: '/test-centers/' + location});
          });
        }
      }
    }

    smStream.end();

    smStream.pipe(createWriteStream(resolve('./public/sitemap.xml')));
  } catch (e) {
    console.error(e);
  }
}

build();
