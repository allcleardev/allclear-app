import React, {Component} from 'react';
import {AppContext} from '@contexts/app.context';
import {bindAll, debounce, get, startCase} from 'lodash';
import SolidHeader from '@general/headers/header-solid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import LinkButton from '@general/buttons/link-button';
import {withRouter} from 'react-router';

class CityPage extends Component {
  static contextType = AppContext;

  state = {
    mobileView: false
  };

  constructor(props) {
    super(props);
    bindAll(this, ['componentDidMount', 'onWindowResize', 'onBackClick', 'componentWillUnmount']);
    this.id = props.match.params.id;
  }

  async componentDidMount() {
    this.onWindowResize();
    window.addEventListener('resize', debounce(this.onWindowResize, 400));
  }

  onWindowResize() {
    this.setState({mobileView: window.innerWidth < 960});
  }

  onBackClick() {
    this.props.history.push(`/map`);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.onWindowResize, 400));
  }

  render() {
    const isMobile = this.state.mobileView;
    const city = startCase(get(this, 'props.match.params.city'));
    const state = startCase(get(this, 'props.match.params.state'));

    return (
      <div className="test-center-page">
        <SolidHeader isLoggedIn={this.isLoggedIn}></SolidHeader>
        <div className="test-center-page__top-background"></div>
        <div className="test-center-page__content">
          {
            isMobile ?
            <div className="mobile-header">
              <IconButton className="mobile-back-btn" onClick={this.onBackClick}>
                <KeyboardArrowLeftIcon/>
              </IconButton>
              <span className="title">Test Center Details</span>
            </div>
                     : <Button
              className="back-btn"
              startIcon={<KeyboardArrowLeftIcon/>}
              onClick={this.onBackClick}
            >
              Back
            </Button>
          }
          <>
            {/* Overview Card */}
            <article className="card test-center-page__overview-card">
              <h1 className="card__title">{city}</h1>
              <div className="card__content">
                <div className="info-line">{state}</div>
              </div>
              {/*<div className="card__actions">*/}
              {/*  <LinkButton href={'facility.url'} text="Website"/>*/}
              {/*</div>*/}
            </article>


            <div className="test-center-page__feedback">
              <span>Want to help us improve our data?</span>
              <a href={this.feedbackURL}
                 target='_blank'
                 rel='noopener noreferrer'
              >
                Suggest Change To Test Center Information
              </a>
            </div>
          </>

        </div>
      </div>
    );
  }
}

export default withRouter(CityPage);

// function DetailRow(props) {
//   return (
//     <div
//       style={{
//         fontSize: props.textSize === 'small' ? '14px' : '16px',
//         lineHeight: '22px',
//         marginBottom: '8px',
//         color: !props.color && '#4F4F4F'
//       }}
//       className={props.color === 'primary' ? 'primary-color' : null}
//     >
//       <span><b>{props.field}: </b></span>
//       <span>{props.value}</span>
//     </div>
//   );
// }
