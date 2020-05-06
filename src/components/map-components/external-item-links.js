import React from 'react';
import DirectionsIcon from '@material-ui/icons/Directions';
import WebIcon from '@material-ui/icons/Web';
import CallIcon from '@material-ui/icons/Call';
import ShareIcon from '@material-ui/icons/Share';

export default function ExternalItemLinks(props) {
  return (
    <div className={`list-item-buttons ${props.display}`} style={props.margin}>
      <div className="link-button">
        <a
          href={'https://www.google.com/maps/dir/?api=1&destination=' + props.description}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(evt) => props.onClick(evt, 'directions')}
        >
          <DirectionsIcon classes={{root: 'link-button-icon'}} />
          <p>Directions</p>
        </a>
      </div>

      {props.phone && (
        <div className="link-button">
          <a
            href={'tel:' + props.phone}
            rel="noopener noreferrer"
            target="_blank"
            onClick={(evt) => props.onClick(evt, 'call')}
          >
            <CallIcon classes={{root: 'link-button-icon'}} />
            <p>Call</p>
          </a>
        </div>
      )}

      {props.website && (
        <div className="link-button">
          <a
            href={props.website}
            rel="noopener noreferrer"
            target="_blank"
            onClick={(evt) => evt.stopPropagation()}
          >
            <WebIcon classes={{root: 'link-button-icon'}} />
            <p>Website</p>
          </a>
        </div>
      )}

      <div className="link-button">
        <a
          href="/home"
          rel="noopener noreferrer"
          target="_self"
          onClick={(evt) => evt.stopPropagation()}
        >
          <ShareIcon classes={{root: 'link-button-icon'}} />
          <p>Share</p>
        </a>
      </div>
    </div>
  );
}
