import Axios from 'axios';

export default class PeopleService {
  static serviceInstance = null;

  constructor() {
    this.baseURL = '/peoples';
    this.sessionId = localStorage.getItem('confirm_sessid');
  }

  static getInstance() {
    if (PeopleService.serviceInstance == null) {
      PeopleService.serviceInstance = new PeopleService();
    }

    return this.serviceInstance;
  }

  getById(id) {
    // return Axios.get(`${this.baseURL}/${id}`, {
    //   headers: {
    //     'X-AllClear-SessionID': this.sessionId,
    //   },
    // });

    // Ttesting Only
    return {
      id: '9DORTS',
      name: '+1 (619) 721-8553',
      phone: '+16197218553',
      dob: '1986-04-03T00:00:00+0000',
      healthWorkerStatusId: 'h',
      healthWorkerStatus: {
        id: 'h',
        name: 'I am a Health Worker or First Responder',
        staff: true,
      },
      latitude: 40.7127753,
      longitude: -74.0059728,
      alertable: true,
      active: true,
      authAt: '2020-04-11T04:38:41+0000',
      phoneVerifiedAt: '2020-04-11T04:38:41+0000',
      createdAt: '2020-04-11T04:38:41+0000',
      updatedAt: '2020-04-11T04:38:41+0000',
      conditions: [],
      exposures: [],
      symptoms: [
        {
          id: 'fv',
          name: 'Fever',
          createdAt: '2020-04-11T04:38:41+0000',
        },
        {
          id: 'sb',
          name: 'Shortness of Breath',
          createdAt: '2020-04-11T04:38:41+0000',
        },
        {
          id: 'dc',
          name: 'Dry Cough',
          createdAt: '2020-04-11T04:38:41+0000',
        },
        {
          id: 'fg',
          name: 'Fatigue',
          createdAt: '2020-04-11T04:38:41+0000',
        },
      ],
    };
  }
}
