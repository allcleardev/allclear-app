import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

// TODO: Convert all buttons to use this component

export default function PrimaryButton({ children, className, style, color, variant, ariaLabel, onClick }) {
  return (
    <Btn className={className} style={style} color={color} variant={variant} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Btn>
  );
}

// NOTE: These styles need to be applied to all buttons in the app and should not be overwritten
const Btn = styled(Button)`
  min-width: 226px;
  padding: 13px;
  border-radius: 10px;
  box-shadow: none;
`;
