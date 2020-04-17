import React from 'react';
import Box from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import Header from '../components/general/headers/header-homescreen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BottomNav from '../components/general/navs/bottom-nav';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AlertSwitch from '../components/general/buttons/toggle';
import Axios from 'axios';


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import { AppContext } from '../../contexts/App.context';
import PeopleService from '../../services/people.service.js';

import HomescreenHeader from '../../components/headers/header-homescreen';
import NavBottom from '../../components/navBottom';
import AlertSwitch from '../../components/switch';

import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';




class SettingsPage extends React.Component {
    state = {
      open: false,
    };
  static contextType = AppContext;
  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'onDeleteProfileClicked', 'handleClose']);
    this.peopleService = PeopleService.getInstance();
    this.session = JSON.parse(localStorage.getItem('session'));
  }

  componentDidMount = () => {};

  onDeleteProfileClicked() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  async onDeleteConfirmedClicked() {
    const id = this.session.person.id;
    this.setState({ loading: true });
    await this.peopleService.deleteProfile(id).then((res) => {
      this.setState({ loading: false });
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <section className="settings">
        <HomescreenHeader navigate={'/profile'}>
          <h1 className="heading">Settings</h1>
        </HomescreenHeader>

        <Container className="cards-container">
          <Link to="/profile" className="desktop-back-btn hide-mobile">
            <ArrowBackIosIcon className=""></ArrowBackIosIcon>
            Back
          </Link>

          <article className="card">
            <div className="card__content">
              <label className="card__term">Text Notification Settings</label>
              <AlertSwitch></AlertSwitch>
            </div>

            <div className="card__content">
              <label className="card__term">Location Settings</label>
              <AlertSwitch></AlertSwitch>
            </div>
          </article>

          <div className="button-container">
            <Button variant="contained" className="delete" fullWidth onClick={this.onDeleteProfileClicked}>
              Delete Profile
            </Button>
          </div>
        </Container>
        <NavBottom active={3}></NavBottom>

        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          PaperProps={{
            style: {
              borderRadius: 14,
              padding: '19px 16px',
              textAlign: 'center',
            },
          }}
        >
          <DialogTitle id="scroll-dialog-title">
            <span style={{ fontWeight: 600 }}>Delete Account</span>
          </DialogTitle>
          <DialogContent>
            <p style={{ fontSize: 15, marginBottom: 28 }}>
              Are you sure you want to permanently delete your Account? This is irreversible.
            </p>
            <div
              className="button-container"
              style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              <Button
                variant="contained"
                onClick={() => this.onDeleteConfirmedClicked()}
                className="delete"
                style={{ margin: 5 }}
              >
                Permanently Delete Account
              </Button>
              <Button variant="contained" onClick={() => this.handleClose()} style={{ margin: 5 }}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}
export default SettingsPage;
