import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link } from 'react-router-dom';

import PeopleService from '@services/people.service.js';
import GAService from '@services/ga.service';
import { AppContext } from '@contexts/app.context';

import Header from '@general/headers/header';
import BottomNav from '@general/navs/bottom-nav';
import AlertSwitch from '@general/buttons/toggle';
import { DEFAULT_NAV_ITEMS } from '@general/headers/header.constants';

import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import { Button, Container, Dialog, DialogTitle, DialogContent, withStyles } from '@material-ui/core';

export default class SettingsPage extends Component {
  state = {
    open: false,
  };
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.gaService = GAService.getInstance();
    this.gaService.setScreenName('settings');

    bindAll(this, ['componentDidMount', 'onDeleteProfileClicked', 'handleClose']);
    this.peopleService = PeopleService.getInstance();
  }

  componentDidMount = () => {};

  onDeleteProfileClicked() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  async onDeleteConfirmedClicked() {
    const id = this.context.appState.person.id;
    this.setState({ loading: true });
    await this.peopleService.deleteProfile(id).then((res) => {
      this.setState({ loading: false });
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <section className="settings">
        <Header navItems={DEFAULT_NAV_ITEMS} enableBackBtn={true}>
          <h1 className="heading">Settings</h1>
        </Header>

        <Container className="cards-container">
          <Link to="/profile" className="desktop-back-btn hide-mobile">
            <ArrowBackIosRounded className=""></ArrowBackIosRounded>
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
            <DefaultButton variant="contained" fullWidth onClick={this.onDeleteProfileClicked}>
              Delete Profile
            </DefaultButton>
          </div>
        </Container>
        <BottomNav active={3}></BottomNav>

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
              <DefaultButton
                variant="contained"
                fullWidth
                onClick={() => this.onDeleteConfirmedClicked()}
                style={{ margin: 5 }}
              >
                Permanently Delete Account
              </DefaultButton>
              <DefaultButton fullWidth onClick={() => this.handleClose()} style={{ margin: 5 }}>
                Cancel
              </DefaultButton>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

// TODO: Move to own general component
const DefaultButton = withStyles((theme) => ({
  root: {
    padding: '12px 16px',
    lineHeight: '22px',
    letterSpacing: '-0.41px',
    fontWeight: '600',
    fontSize: '17px',
    borderRadius: '10px',
  },
  contained: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))(Button);
