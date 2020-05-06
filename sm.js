const {SitemapStream} = require('sitemap');
const {createWriteStream} = require('fs');
const {resolve} = require('path');
const axios = require('axios');
const {set, keys, forEach, bindAll} = require('lodash');
const rateLimit = require('axios-rate-limit');

class SiteBuilder {

  constructor() {
    this.api = rateLimit(axios.create(), {maxRequests: 75, perMilliseconds: 1000});
    const currBranch = process.env.GIT_BRACH;

    if (currBranch === 'master') {
      this.baseURL = 'https://api.allclear.app';
      this.appUrl = 'https://go.allclear.app';
    } else if (currBranch === 'staging') {
      this.baseURL = 'https://api-staging.allclear.app';
      this.appUrl = 'https://app-staging.allclear.app';
    } else if (currBranch === 'dev') {
      this.baseURL = 'https://api-dev.allclear.app';
      this.appUrl = 'https://app-dev.allclear.app';
    } else {
      this.baseURL = 'https://api-staging.allclear.app';
      this.appUrl = 'https://app-staging.allclear.app';
    }

    console.log('--- Creating Sitemap With These URLs: ---')
    console.log('baseURL', this.baseURL);
    console.log('appUrl', this.appUrl);

    this.failures = {};

    bindAll(this, [
      'getStates',
      'getCities',
      'build',
      'populateCities',
      'populateAllSitesInCity',
    ]);
    if(process.env.GIT_BRACH === 'staging' || process.env.GIT_BRACH === 'master' || process.env.GIT_BRACH === 'dev'){
      console.log(`Building on branch: ${currBranch}`);
      this.build();
    }else{
      console.log(`Skipping build on branch: ${currBranch}`);
    }
  }

  async getLocations(body) {
    return this.api({
      method: 'POST',
      headers: {'content-type': 'application/json'},
      url: `${this.baseURL}/facilities/search`,
      data: {
        ...body,
        'pageSize': 500 // todo: maybe this is not enough in the future
      },
    });
  }

  async getStates() {
    return this.api({
      method: 'GET',
      headers: {'content-type': 'application/json'},
      url: `${this.baseURL}/facilities/states`
    });
  }

  async getCities(state) {
    return this.api({
      method: 'GET',
      url: `${this.baseURL}/facilities/cities`,
      params: {state}
    });
  }

  populateAllSitesInCity() {
    let allPromises = [];

    // loop thru states
    forEach(this.stateMap, async (e, state) => {

      // loop thru cities
      forEach(this.stateMap[state].cities, (e, city) => {

        // call a search for all facilities within a city
        const currPromise = this.getLocations({city, state})
          .then(({data}) => {
            const {records} = data;
            const dashedCity = dashStr(city);
            const dashedState = dashStr(state);
            set(this, `stateMap.${state}.cities.${city}`, {...e, records});

            // finally, write out this facility route to the sitemap
            forEach(records, (facility) => {
              const dashedName = dashStr(facility.name);
              const {id} = facility;
              // todo: comment this in for both name and id
              // this.smStream.write({url: `/locations/${dashedState}/${dashedCity}/${dashedName}`});
              this.smStream.write({url: `/locations/${dashedState}/${dashedCity}/${id}`});
            });

          })
          .catch((err) => {
            this.failures[city] = {...err, location: `${state},${city}` };
          });
        allPromises.push(currPromise);

      });
    });

    Promise.all(allPromises)
      .then(() => {
        console.log('-------------------');
        console.log('Sitemap Completed!');
        console.log('-------------------');
        console.log(`${keys(this.failures).length} Failures ⬇`);

        forEach(this.failures, (e) => {
          console.log(e.location);
        });

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
          const dashedCity = dashStr(cityName);
          const dashedState = dashStr(state);
          set(this, `stateMap.${state}.cities.${cityName}`, {total: city.total});
          this.smStream.write({url: `/locations/${dashedState}/${dashedCity}`});
        });
      });
      allPromises.push(currPromise);
    });

    Promise.all(allPromises).then(() => {
      console.log('=== Populating Centers Per City . Please Hold... ===')
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
      console.log('Populating States');
      await this.getStates()
        .then((resp) => {

          forEach(resp.data, (e2) => {
            this.stateMap[e2.name] = {};
          });

          console.log('Populating Cities');
          this.populateCities();

        })
        .catch((e, i) => {

        });

    } catch (e) {
      console.error(e);
    }
  }

}

function dashStr(str) {
  return str.replace(/ /g, '-');
}

const builder = new SiteBuilder();
