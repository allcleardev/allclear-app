import React from 'react';
import styled from 'styled-components'; 
import ThumbUpIcon from '@material-ui/icons/ThumbUp'; 
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button';

export default function InitialExperiences(props) {    

    function handlePositive() {  
      props.handler({
        edited: true, 
        positive: true, 
        tags: []
      });
    } 

    function handleNegative(){  
      props.handler({
        edited: true, 
        positive: false, 
        tags: []
      });
    } 
    
    return ( 
    <> 
    <Content>
        Please rate your overall experience with this test location:
    </Content>  
     <Actions>
     <RateButton color={'primary'} variant={props.payload.edited && props.payload.positive ? 'contained' : 'outlined'} onClick={() => handlePositive()}> 
       <ThumbUpIcon style={{margin: 15}} fontSize={'large'}/> 
       Positive  
     </RateButton>  
     <RateButton color={'primary'} variant={props.payload.edited && !props.payload.positive ? 'contained' : 'outlined'} onClick={() => handleNegative()}>
       <ThumbDownIcon style={{margin: 15}} fontSize={'large'}/> 
       Negative
     </RateButton> 
    </Actions>   
    { props.payload.edited ? 
    <NextButton onClick={props.payload.positive ? props.toPos : props.toNeg}>
      Next
    </NextButton>  
    : null
    }
    <ProgressBottom
      barColor='#007AFF' 
      barStyle='progress-experiences' 
      barWidth='33%'
      progress="0"
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

const RateButton = styled(PrimaryButton)` 
  border-color: #007AFF;     
  .MuiButton-label { 
    width: 100%; 
    align-items: center;  
    justify-content: center; 
    display: flex; 
    flex-direction: column;
  }
`;  

const NextButton = styled(PrimaryButton)`
  margin-top: 20px;  
  align-self: center;
  width: 30%;
`;