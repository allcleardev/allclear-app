const {SitemapStream} = require('sitemap');
const {createWriteStream} = require('fs');
const {resolve} = require('path');
const axios = require('axios');
const {set, get, forEach, bindAll} = require('lodash');

class SiteBuilder {

  constructor() {

    if (process.env.GIT_BRANCH === 'master') {
      this.baseURL = 'https://api.allclear.app';
      this.appUrl = 'https://go.allclear.app';
    } else if (process.env.GIT_BRANCH === 'staging') {
      this.baseURL = 'https://api-staging.allclear.app';
      this.appUrl = 'https://app-staging.allclear.app';
    } else if (process.env.GIT_BRANCH === 'dev'){
      this.baseURL = 'https://api-dev.allclear.app';
      this.appUrl = 'https://app-dev.allclear.app';
    }else{
      this.baseURL = 'https://api-staging.allclear.app';
      this.appUrl = 'https://app-staging.allclear.app';
    }

    bindAll(this, [
      'getStates',
      'getCities',
      'build',
      'populateCities',
      'populateAllSitesInCity',
    ]);
  }


  async getLocations(body) {
    const z = await axios({
      method: 'POST',
      headers: {'content-type': 'application/json'},
      url: `${this.baseURL}/facilities/search`,
      data: {
        ...body,
        "pageSize":500 // todo: maybe this is not enough in the future
      },
    });
    return z
  }

  async getStates() {
    return axios({
      method: 'GET',
      headers: {'content-type': 'application/json'},
      url: `${this.baseURL}/facilities/states`
    });
  }

  async getCities(state) {
    return axios({
      method: 'GET',
      url: `${this.baseURL}/facilities/cities`,
      params: {state}
    });
  }

  populateAllSitesInCity() {
    let allPromises = [];

    // loop thru states
    forEach(this.stateMap, async (e, state) => {
      console.log('--------STATE------', state);

      // loop thru cities
      forEach(this.stateMap[state].cities, (e, city) => {

        // call a search for all facilities within a state
        const currPromise = this.getLocations({city, state})
          .then(({data}) => {
            const {records} = data;
            set(this, `stateMap.${state}.cities.${city}`, {...e, records});

            // finally, write out this facility route to the sitemap
            forEach(records, (facility) => {
              this.smStream.write({url: `/locations/${state}/${city}/${facility.id}`});
            });

          })
          .catch((err) => {
            console.log('FAILED ON---', city)
          });
        allPromises.push(currPromise);

      });
    });

    Promise.all(allPromises).then(() => {
      console.log('-------------------');
      console.log(this.stateMap)
      console.log('-------------------');
      this.smStream.end();
      this.smStream.pipe(createWriteStream(resolve('./public/sitemap.xml')));
    });
  }

  populateCities() {
    let allPromises = [];
    forEach(this.stateMap, async (e, state) => {
      const currPromise = this.getCities(state).then(({data}) => {
        forEach(data, (city) => {
          const cityName = city.name;
          set(this, `stateMap.${state}.cities.${cityName}`, {total: city.total});
          this.smStream.write({url: `/locations/${state}/${cityName}`});
        });
      });
      allPromises.push(currPromise);
    });

    Promise.all(allPromises).then(() => {
      this.populateAllSitesInCity();
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
