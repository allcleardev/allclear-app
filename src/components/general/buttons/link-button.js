import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export default function LinkButton(props) {
  const onClick = (evt) => {
    evt.stopPropagation();
    props.onClick(evt);
  };

  return (
    <a
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
      onClick={onClick}
    >
      {
        props.hasIcon
          ? <IconButton
            aria-label="call"
            className="link-icon-button primary-color primary-outline d-lg-none"
            color="primary"
          >
            {props.children}
          </IconButton>
          : <Button className="link-button primary-color primary-outline">
            {props.text}
          </Button>
      }
    </a>
  );
}