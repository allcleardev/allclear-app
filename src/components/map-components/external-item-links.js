import React from 'react';
import Button from '@material-ui/core/Button';

export default function ExternalItemLinks(props) {
  return (
    <div className={`buttons ${props.display}`} style={props.margin}>
      <a
        href={'https://www.google.com/maps/dir/?api=1&destination=' + props.description}
        rel="noopener noreferrer"
        target="_blank"
        onClick={(evt) => props.onClick(evt, 'directions')}
      >
        <Button className="btn primary-color primary-outline">Directions</Button>
      </a>

      {props.phone && (
        <a
          href={'tel:' + props.phone}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(evt) => props.onClick(evt, 'call')}
        >
          <Button className="btn primary-color primary-outline d-lg-none" style={{ marginLeft: '10px' }}>
            Call
          </Button>
        </a>
      )}

      {props.website && (
        <a
          href={props.website}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(evt) => evt.stopPropagation()}
        >
          <Button className="btn primary-color primary-outline website-btn">
            Website
          </Button>
        </a>
      )}
    </div>
  );
}
