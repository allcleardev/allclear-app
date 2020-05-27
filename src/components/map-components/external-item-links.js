import React from 'react';
import LinkButton from '@general/buttons/link-button';
import DirectionsIcon from '@material-ui/icons/Directions';
import WebIcon from '@material-ui/icons/Web';
import CallIcon from '@material-ui/icons/Call';
import ShareIcon from '@material-ui/icons/Share';

export default function ExternalItemLinks(props) {
  const buttons = [
    {
      id: props.description,
      href: `https://www.google.com/maps/dir/?api=1&destination=${props.description}`,
      text: 'Directions',
      icon: <DirectionsIcon />,
    },
    {
      id: props.phone,
      href: 'tel:' + props.phone,
      text: 'Call',
      icon: <CallIcon />,
    },
    {
      id: props.website,
      href: props.website,
      text: 'Website',
      icon: <WebIcon />,
    },
    // TODO: pull Share out of external-item-links (or give it a separate treatment here)
    // since it is not an external link and will mess up accessibility
    {
      id: 'share',
      href: null,
      text: 'Share',
      icon: <ShareIcon />,
    },
  ].filter((btn) => btn.id);

  return (
    <div className={`list-item-buttons ${props.display}`} style={props.margin}>
      {buttons.map((btn) => (
        <div key={btn.text} className="link-button">
          <LinkButton
            href={btn.href}
            text={btn.text}
            theme="round-icon"
            onClick={(evt) => {
              props.onClick(evt, btn.text);
            }}
          >
            {btn.icon}
          </LinkButton>
        </div>
      ))}
    </div>
  );
}
