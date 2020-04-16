import React from 'react';
import Container from '@material-ui/core/Container';

import VerticalLinearStepper from '../components/vertical-stepper';

function getSteps() {
  return ['Basic Demographic Information', 'Symptoms', 'Recent Activity'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Please provide some information about yourself so we can determine the risk severity';
    case 1:
      return 'Select all symptoms that you are currently experiencing';
    case 2:
      return `Let's determine any potential threat vectors you may have been exposed to over the past week`;
    default:
      return 'Unknown step';
  }
}

export default function HomePage() {
  return (
    <Container>
      <VerticalLinearStepper getSteps={getSteps} getStepContent={getStepContent} />
    </Container>
  );
}
