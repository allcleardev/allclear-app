import React from 'react';
import styled from 'styled-components'; 
import ThumbUpIcon from '@material-ui/icons/ThumbUp'; 
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button';

export default function InitialExperiences(props) {    

    function handleFeedback(isPositive) { 
      props.handler({
        edited: true, 
        positive: isPositive, 
        tags: []
      });
    } 

    function isPosSelected(isPositive){
      if(isPositive){   
        return props.payload.edited && props.payload.positive ? 'contained' : 'outlined';
      } else {
        return props.payload.edited && !props.payload.positive ? 'contained' : 'outlined';
      }
    } 
    
    return ( 
    <> 
    <Content>
        Please rate your overall experience with this test location:
    </Content>
     <Actions>
     <RateButton color={'primary'} variant={isPosSelected(true)} onClick={() => handleFeedback(true)}> 
       <ThumbUpIcon style={{margin: '5%'}} fontSize={window.innerWidth < 960 ? 'medium' : 'large'}/> 
       Positive  
     </RateButton>  
     <RateButton color={'primary'} variant={isPosSelected(false)} onClick={() => handleFeedback(false)}>
       <ThumbDownIcon style={{margin: '5%'}} fontSize={window.innerWidth < 960 ? 'medium' : 'large'}/> 
       Negative
     </RateButton> 
    </Actions>   
    { props.payload.edited ? 
    <NextButton onClick={props.payload.positive ? props.toPos : props.toNeg}>
      Next
    </NextButton>  
    : <SpaceButton onClick={() => {}} disabled={true} />
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
  overflow-y: visible;
  padding: ${window.innerWidth < 960 ? '0px' : '0 24px'};
  text-align: center;
  letter-spacing: -0.41px;
  font-size: ${window.innerWidth < 960 ? '16px' : '20px'};
`;  

const Actions = styled(DialogActions)`
  flex-direction: row; 
  align-self: center;
`; 

const RateButton = styled(PrimaryButton)` 
  border-color: #007AFF;     
  ${window.innerWidth < 960 ? 'min-width: 110px' : ''};  
  .MuiButton-label { 
    width: 100%;
    height: 55%;
    align-items: center;  
    justify-content: center; 
    display: flex; 
    flex-direction: column;
  }
`;  

const NextButton = styled(PrimaryButton)`
  margin-top: 5px;
  margin-bottom: 5px;
  align-self: center;
  width: 30%;
  box-shadow: 0px 0px 15px 5px lightGrey;
  flex-direction: column;
`;

const SpaceButton = styled(PrimaryButton)`
  margin-top: 30px;
  align-self: center;
  width: 30%;
`;