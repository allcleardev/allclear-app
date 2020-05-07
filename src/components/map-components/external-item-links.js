import React from 'react';
import LinkButton from '@general/buttons/link-button';
import DirectionsIcon from '@material-ui/icons/Directions';
import WebIcon from '@material-ui/icons/Web';
import CallIcon from '@material-ui/icons/Call';
import ShareIcon from '@material-ui/icons/Share';

export default function ExternalItemLinks(props) {
  return (
    <div className={`list-item-buttons ${props.display}`} style={props.margin}>
      <div className="link-button">
        <LinkButton
          href={'https://www.google.com/maps/dir/?api=1&destination=' + props.description}
          text="Directions"
          theme="round-icon"
          onClick={(evt) => props.onClick(evt, 'directions')}
        >
          <DirectionsIcon />
        </LinkButton>
      </div>

      {props.phone && (
        <div className="link-button">
          <LinkButton
            href={'tel:' + props.phone}
            text="Call"
            theme="round-icon"
            onClick={(evt) => props.onClick(evt, 'call')}
          >
            <CallIcon />
          </LinkButton>
        </div>
      )}

      {props.website && (
        <div className="link-button">
          <LinkButton
            href={props.website}
            text="Website"
            theme="round-icon"
          >
            <WebIcon />
          </LinkButton>
        </div>
      )}

      <div className="link-button">
        <LinkButton
          href="/home"
          text="Share"
          theme="round-icon"
        >
          <ShareIcon />
        </LinkButton>
      </div>
    </div>
  );
}
