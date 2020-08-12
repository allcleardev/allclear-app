import React from 'react';
import styled from 'styled-components';  

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button';  

import {ReactComponent as HeartIcon} from '@assets/images/heart-icon.svg';

export default function NegativeExperiences(props) {    
 

    function showNextButton() { 
      if(props.payload.tags.length === 0) { 
        return false;
      } else { 
        return true;
      }
    } 

    function handleSelection(tag) { 
      let arr = props.payload.tags;

      if(arr.includes(tag)){ 
        arr = arr.filter( (item) => (!(item === tag)) );
        props.handler({
          edited: props.payload.edited, 
          positive: props.payload.positive, 
          tags: arr
        });
      } else { 
        arr.push(tag);
        props.handler({
          edited: props.payload.edited, 
          positive: props.payload.positive, 
          tags: arr
        });
      }
    }  

    return (
    <> 
    <Content>
        What made your testing experience Negative?
    </Content>    
     <Actions>  
      <Box>
      <TagButton color={'primary'} variant={props.payload.tags.includes('ph') ? 'contained' : 'outlined'} onClick={() => handleSelection('ph')}> 
        <HeartIcon />
        Poor Hygiene
      </TagButton> 
      <TagButton color={'primary'} variant={props.payload.tags.includes('su') ? 'contained' : 'outlined'} onClick={() => handleSelection('su')}> 
        <HeartIcon />
        Seemed Understaffed
      </TagButton>  
      </Box> 
      <Box>
     <TagButton color={'primary'} variant={props.payload.tags.includes('ct') ? 'contained' : 'outlined'} onClick={() => handleSelection('ct')}> 
       <HeartIcon />
       Couldn't Get Tested
     </TagButton> 
     <TagButton color={'primary'} variant={props.payload.tags.includes('lt') ? 'contained' : 'outlined'} onClick={() => handleSelection('lt')}>  
       <HeartIcon />
       Long Wait Time
     </TagButton>  
     </Box> 
     <Box>
     <TagButton color={'primary'} variant={props.payload.tags.includes('ca') ? 'contained' : 'outlined'} onClick={() => handleSelection('ca')}>  
      <HeartIcon />
       Confusing Appointment Process
     </TagButton> 
     <TagButton color={'primary'} variant={props.payload.tags.includes('oc') ? 'contained' : 'outlined'} onClick={() => handleSelection('oc')}>  
       <HeartIcon />
       Overly Crowded
     </TagButton> 
     </Box>
    </Actions>  
    { showNextButton() ? 
    <NextButton onClick={props.action}>
      Next
    </NextButton>  
    : null
    }  
    <ProgressBottom
      barColor='#007AFF' 
      barStyle='progress-experiences' 
      barWidth='33%'
      progress="33%"
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
  flex-direction: column; 
  align-self: center; 
`;  
const Box = styled(DialogActions)`
  flex-direction: row; 
  align-self: center;  
  margin: 5px;
`; 

const TagButton = styled(PrimaryButton)` 
  border-color: #007AFF;  
  border-radius: 20px;  
  height: 60px; 
  width: 100px;
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