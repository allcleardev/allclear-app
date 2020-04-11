import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import Container from '@material-ui/core/Container';

import HomescreenHeader from '../components/headers/header-homescreen';
import NavBottom from '../components/navBottom';
import userAvatar from '../assets/images/defaultProfile.svg';
import PeopleService from '../services/people.service.js';

import { Button, IconButton, Chip } from '@material-ui/core';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);

    bindAll(this, ['componentDidMount']);

    this.state = {
      result: [],
    };

    this.peopleService = PeopleService.getInstance();
  }

  async componentDidMount() {
    const result = await this.peopleService.getById('HHT9T2'); // Hardcoding for now

    console.log('RESULT:::', result);
  }

  render() {
    return (
      <section className="profile-view">
        <HomescreenHeader>
          <div className="avatar-edit">
            <div className="avatar">
              <img
                src={userAvatar}
                alt="avatar"
                style={{ borderRadius: '50%', backgroundColor: 'white', border: '1px solid white' }}
              />
            </div>
          </div>
        </HomescreenHeader>

        <Container className="cards-container">
          <article className="card">
            <dl className="card__content">
              <dt className="card__term">Phone</dt>
              <dd className="card__description">(408) 555 - 5555</dd>
            </dl>
          </article>

          <article className="card">
            <Link to="/profile-edit" className="edit">
              <EditIconButton></EditIconButton>
            </Link>

            <dl className="card__content">
              <dt className="card__term">Location</dt>
              <dd className="card__description">11211</dd>
            </dl>

            <dl className="card__content">
              <dt className="card__term">Exposure to COVID-19</dt>
              <dd className="card__description">Known Contact With Someone</dd>
            </dl>

            <dl className="card__content">
              <dt className="card__term">Health Worker Status</dt>
              <dd className="card__description">I live with a health worker or first responder</dd>
            </dl>

            <dl className="card__content">
              <dt className="card__term">Conditions</dt>
              <dd className="card__description">
                <Chip label="Weakened Immune System" className="chip"></Chip>
                <Chip label="Kidney Failure or Cirrhosis" className="chip"></Chip>
              </dd>
            </dl>

            <dl className="card__content">
              <dt className="card__term">Symptoms</dt>
              <dd className="card__description">
                <Chip label="Fever" className="chip"></Chip>
                <Chip label="Dry Cough" className="chip"></Chip>
                <Chip label="Runny Nose/Nasal Congestion" className="chip"></Chip>
              </dd>
            </dl>
          </article>

          <Button style={{ color: '#2A7DF4', border: '1px solid #2A7DF4' }} className="btn-big  fontsize-16">
            Logout
          </Button>
        </Container>

        <NavBottom active={3}></NavBottom>
      </section>
    );
  }
}

const EditIconButton = () => {
  return (
    <IconButton>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.7437 0.712402L18.7437 5.7124L5.74365 18.7124H0.743652V13.7124L13.7437 0.712402Z"
          stroke="#242424"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};
