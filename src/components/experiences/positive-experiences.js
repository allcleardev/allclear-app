import React from 'react';
import styled from 'styled-components';  

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button'; 

import {ReactComponent as FlashIcon} from '@assets/images/flash-icon.svg';  
import {ReactComponent as BedIcon} from '@assets/images/bed-icon.svg';  
import {ReactComponent as MaskIcon} from '@assets/images/mask-icon.svg';  
import {ReactComponent as TimeIcon} from '@assets/images/time-icon.svg';  
import {ReactComponent as HeartIcon} from '@assets/images/heart-icon.svg';  
import {ReactComponent as DistancingIcon} from '@assets/images/distancing-icon.svg'; 

export default function PositiveExperiences(props) {    

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
        What made your testing experience positive?
    </Content>    
     <Actions>  
      <Box>
      <TagButton color={'primary'} variant={props.payload.tags.includes('st') ? 'contained' : 'outlined'} onClick={() => handleSelection('st')}> 
        <TimeIcon />
        Short Wait Time
      </TagButton> 
      <TagButton color={'primary'} variant={props.payload.tags.includes('gh') ? 'contained' : 'outlined'} onClick={() => handleSelection('gh')}> 
        <FlashIcon />
        Good Hygiene
      </TagButton>  
      </Box> 
      <Box>
     <TagButton color={'primary'} variant={props.payload.tags.includes('fs') ? 'contained' : 'outlined'} onClick={() => handleSelection('fs')}> 
       <HeartIcon />
       Friendly Staff
     </TagButton> 
     <TagButton color={'primary'} variant={props.payload.tags.includes('pp') ? 'contained' : 'outlined'} onClick={() => handleSelection('pp')}>  
       <MaskIcon />
       PPE Provided
     </TagButton>  
     </Box> 
     <Box>
     <TagButton color={'primary'} variant={props.payload.tags.includes('se') ? 'contained' : 'outlined'} onClick={() => handleSelection('se')}>  
      <DistancingIcon />
       Social Distancing
     </TagButton> 
     <TagButton color={'primary'} variant={props.payload.tags.includes('gm') ? 'contained' : 'outlined'} onClick={() => handleSelection('gm')}>  
       <BedIcon />
       Good Bedside Manner
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