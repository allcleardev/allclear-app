
import locations from '../hooks/airtable'
console.log(locations.locations[0]);

export const mapLocationData = locations.locations.slice(1,100);

/*
The data from Airtable is displayed as such
{
Name: "Urgent Care for Children - Trussville",
Address: "117 North Chalkville Road Trussville, AL 35173",
Hours: "2pm - 10 pm Monday - Friday; 10am - 8pm Saturday - Sunday",
Latitude: 33.6214073,
Longitude: -86.6086818,
State: "Alabama",
Phone: "(205) 848-2273",
Main Website: "https://www.childrensurgent.com/coronavirus-update-and-testing-hotline/",
Appointment Needed: "Yes",
Phone Extension: "",
Drive Through: "",
}
*/

/*
export const mapLocationData = [
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit arnet, asdf consec as adipiscing elit. laculis pretium.",
    status: "Open",
    service_time: "9am - 5pm",
    commute: "Walk-Up"
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit arnet, asdf consec as adipiscing elit. laculis pretium.",
    status: "Closed",
    service_time: "9am - 5pm",
    commute: "Walk-Up"
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit arnet, asdf consec as adipiscing elit. laculis pretium.",
    status: "Open",
    service_time: "9am - 5pm",
    commute: "Walk-Up"
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit arnet, asdf consec as adipiscing elit. laculis pretium.",
    status: "Open",
    service_time: "9am - 5pm",
    commute: "Walk-Up"
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit arnet, asdf consec as adipiscing elit. laculis pretium.",
    status: "Open",
    service_time: "9am - 5pm",
    commute: "Walk-Up"
  }
];
*/