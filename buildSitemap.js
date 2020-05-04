const {SitemapStream} = require('sitemap');
const {createWriteStream} = require('fs');
const {resolve} = require('path');
const axios = require('axios');
const {set, get, forEach, bindAll} = require('lodash');

class SiteBuilder {

  // baseURL = '';
  // appUrl= '';


  constructor() {
    if (get(process,'env.GIT_BRANCH') === 'master') {
      this.baseURL = 'https://api.allclear.app';
      this.appUrl = 'https://go.allclear.app';
    } else if (get(process,'env.GIT_BRANCH') === 'staging') {
      this.baseURL = 'https://api-staging.allclear.app';
      this.appUrl = 'https://app-staging.allclear.app';
    } else {
      this.baseURL = 'https://api-dev.allclear.app';
      this.appUrl = 'https://app-dev.allclear.app';
    }
    bindAll(this, [
      'getStates',
      'getCities',
      'build',
      'populateCities',
    ]);
  }


  async getStates() {
    return axios({
      method: 'GET',
      headers: {'content-type': 'application/json'},
      url: `https://api-dev.allclear.app/facilities/states`
    });
  }

  async getCities(state) {
    return axios({
      method: 'GET',
      url: `https://api-dev.allclear.app/facilities/cities`,
      params: {state}
    });
  }

  populateCities() {
    let allPromises = [];
    forEach(this.stateMap, async (e, state) => {
      const currPromise = this.getCities(state).then(({data}) => {
        forEach(data,(city) => {
          const cityName = city.name;
          set(this, `stateMap.${state}.cities.${cityName}`, {total: city.total});
          this.smStream.write({url: `/${state}/${cityName}`});
        });
      });
      allPromises.push(currPromise);
    });

    Promise.all(allPromises).then(() => {
      this.smStream.end();
      this.smStream.pipe(createWriteStream(resolve('./public/sitemap.xml')));
    });
  }


  async build() {
    try {
      this.smStream = new SitemapStream({hostname: this.appUrl});

      this.smStream.write({url: '/map'});
      this.smStream.write({url: '/contact-tracing'});
      this.smStream.write({url: '/create-account'});
      this.smStream.write({url: '/state-list'});

      this.stateMap = {};
      await this.getStates()
        .then((resp) => {

          forEach(resp.data, (e2, i2) => {
            this.stateMap[e2.name] = {};
          });

          this.populateCities();

        })
        .catch((e, i) => {
          console.log(e, i);
        });


      // forEach(states, (e, i) => {
      //   console.log(e);
      //   console.log(i);
      //   // const z = await getCities()
      // });

      // if (facilitiesResponse.data && facilitiesResponse.data.records) {
      //   facilitiesResponse.data.records.forEach((record) => {
      //     if (!stateMap[record.state]) {
      //       stateMap[record.state] = {
      //         cities: {}
      //       };
      //     }
      //
      //     if (!stateMap[record.state].cities[record.city]) {
      //       stateMap[record.state].cities[record.city] = [];
      //     }
      //
      //     stateMap[record.state].cities[record.city].push(record.id);
      //   });
      //
      //   for (let stateKey in stateMap) {
      //     smStream.write({ url: '/locations/' + stateKey});
      //
      //     for (let cityKey in stateMap[stateKey].cities) {
      //       smStream.write({ url: '/locations/' + stateKey + '/' + cityKey});
      //
      //       stateMap[stateKey].cities[cityKey].forEach((location) => {
      //         smStream.write({ url: '/test-centers/' + location});
      //       });
      //     }
      //   }
      // }

    } catch (e) {
      console.error(e);
    }
  }


}

const builder = new SiteBuilder();
builder.build();
