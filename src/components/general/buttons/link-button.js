import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export default function LinkButton(props) {
  const onClick = (evt) => {
    evt.stopPropagation();
    props.onClick && props.onClick(evt);
  };

  // themes:
  // rectangle-text
  // rectangle-icon
  // round-icon

  return (
    <a href={props.href} rel="noopener noreferrer" target="_blank" onClick={onClick}>
      {props.theme === 'rectangle-text' && (
        <Button className="link-button primary-color primary-outline">{props.text}</Button>
      )}
      {props.theme === 'rectangle-icon' && (
        <IconButton
          aria-label="call"
          className="link-icon-button primary-color primary-outline d-lg-none"
          color="primary"
        >
          {props.children}
        </IconButton>
      )}
      {props.theme === 'round-icon' && (
        <>
          {React.cloneElement(props.children, { className: 'link-button-icon' })}
          <p>{props.text}</p>
        </>
      )}
    </a>
  );
}
