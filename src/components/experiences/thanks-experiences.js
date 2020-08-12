import React from 'react';
import styled from 'styled-components';

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button';

export default function ThanksExperiences(props) {

    return (
    <>
    <Content>
        Thank you for leaving a Rating
    </Content>  
     <Actions>
     <DoneButton color={'primary'} variant={'contained'} onClick={props.action}>
       Done
     </DoneButton>  
    </Actions>  
    <ProgressBottom
      barColor='#007AFF' 
      barStyle='progress-experiences' 
      barWidth='33%'
      progress="67%"
    /> 
   </> 
   );
} 

const Content = styled(DialogContent)`
  overflow-y: hidden;
  margin-bottom: 46px;
  padding: 0 24px;
  text-align: center;
  letter-spacing: -0.41px;
  font-size: 20px;
`;  

const Actions = styled(DialogActions)`
  flex-direction: row; 
  align-self: center;
`; 

const DoneButton = styled(PrimaryButton)` 
  border-color: #007AFF; 
`; 