import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import Axios from 'axios';

import states from './Setting.state';
import { AppContext } from '../../contexts/App.context';

import HomescreenHeader from '../../components/headers/header-homescreen';
import NavBottom from '../../components/navBottom';
import PeopleService from '../../services/people.service.js';
import AlertSwitch from '../../components/switch';

import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';

export default class Settings extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'onDeleteProfileClicked', 'handleClose']);
    this.peopleService = PeopleService.getInstance();
  }

  state = states;

  componentDidMount = () => {};

  onDeleteProfileClicked() {
    this.setState({ open: true });
  }

  async onDeleteConfirmedClicked() {
    this.setState({ loading: true });

    await Axios.delete('/peoples')
      .then((response) => {
        this.history.push('/map');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  handleClose() {
    this.setState({ open: false });
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
