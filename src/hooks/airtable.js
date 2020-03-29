// import Airtable from "airtable";
// const airbase = new Airtable({apiKey: 'keynhmIL7OONcUxBJ'}).base('appVvpsOtgUT7F3bi');

// let locationdata = []
// function getData() {
//   return airbase('Table 1').select({
//     view: 'Grid view',
//     fields: ['Name', 'Address', 'Latitude', 'Longitude', 'State', 'Phone', 'Phone Extension', 'Main Website', 'Hours', 'Drive Through', 'Appointment Needed']
//   }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     locationdata = [...locationdata, ...records.map(x => x.fields)]
//     // records.forEach(function(record) {
//     //     console.log('Retrieved', record.get('Name'));
//     // });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
//     console.log('imported')
// });
// }

import loc_data from "../data/locations.json";

class Locations {
  constructor() {
    this.fields = [
      "Name",
      "Address",
      "Latitude",
      "Longitude",
      "State",
      "Phone",
      "Phone Extension",
      "Main Website",
      "Hours",
      "Drive Through",
      "Appointment Needed"
    ];
    this.locations = this.normalize_fields(loc_data);
    this.length = this.locations.length
  }

  normalize_fields(data) {
    for(let row of data) {
      for(let key of this.fields) {
        if (!(key in row)) {
          row[key] = "";
        }
      }
    }
    return data;
  }

  getById(id) {
    if( id > -1 && id < this.locations.length) {
      return this.locations[id];
    }
  }

  getAll() {
    return this.locations
  }
}

const locations = new Locations();
export default locations;
