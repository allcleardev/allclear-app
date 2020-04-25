import React from 'react';
import { Link } from 'react-router-dom';
import finn from '@assets/images/finn.png';
import Button from '@material-ui/core/Button';

export default function NotFoundPage() {
  return (
    <div className="not-found-page bg-primary" style={{ color: '#fff' }}>
      <h1>404 - page not found</h1>
      <div className="not-found-page__content">
        <img src={finn} alt="finn-the-dog" />
        <div className="not-found-page__text">
          <span>We think Finneas ate it!</span>
          <span>But don't worry, he's a good boy.</span>
          <Link to="/map" className="wrapBtnS">
            <Button variant="contained" size="large" style={{ background: '#fff' }}>
              Find Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
