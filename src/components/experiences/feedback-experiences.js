import React from 'react';
import styled from 'styled-components';

import { DialogContent, DialogActions } from '@material-ui/core';
import ProgressBottom from '@general/navs/progress-bottom'; 

import PrimaryButton from '@general/buttons/primary-button';  

export default function FeedbackExperiences(props) {    
 
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

    function renderTags() {  
      let tagContainer = [];
      for(let i=0; i<6; i+=2){ 
        tagContainer.push( 
          <Box>
          <TagButton color={'primary'} variant={isTagSelected(props.tags[i].id)} onClick={() => handleSelection(props.tags[i].id)}> 
            {props.payload.tags.includes(props.tags[i].id) ? props.tags[i].whiteIcon : props.tags[i].icon}
            {props.tags[i].name}
          </TagButton> 
          <TagButton color={'primary'} variant={isTagSelected(props.tags[i+1].id)} onClick={() => handleSelection(props.tags[i+1].id)}> 
            {props.payload.tags.includes(props.tags[i+1].id) ? props.tags[i+1].whiteIcon : props.tags[i+1].icon}
            {props.tags[i+1].name}
          </TagButton>  
          </Box>
        );
      }
      return tagContainer;
    } 

    function isTagSelected(tagId){
      return props.payload.tags.includes(tagId) ? 'contained' : 'outlined';
    } 

    return (
    <> 
    <Content>
        What made your testing experience {props.payload.positive ? 'positive' : 'negative'}?
    </Content>   
    
     <Actions disableSpacing>    
      { 
        renderTags()   
      }
    </Actions>  
  
    { showNextButton() ? 
    <NextButton onClick={props.action}>
      Next
    </NextButton>  
    : <SpaceButton disabled={true}/>
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
  overflow-y: visible;
  padding: ${window.innerWidth < 960 ? '0px' : '0 24px'};
  text-align: center;
  letter-spacing: -0.41px;
  font-size: ${window.innerWidth < 960 ? '16px' : '20px'};
`;  

const Actions = styled(DialogActions)`
  flex-direction: column; 
  align-self: center; 
  .MuiDialogActions-root{
    padding: 2px; 
  }
`;  
const Box = styled(DialogActions)`
  flex-direction: row; 
  align-self: center;  
  ${((window.innerWidth < 960) ? 'margin: 3px' : '')}
`; 

const TagButton = styled(PrimaryButton)` 
  border-color: #007AFF;  
  border-radius: 20px;  
  ${((window.innerWidth < 960) ? 'font-size: 10px' : '')}; 
  height: ${((window.innerWidth) < 960 ? '100%' : '65%')};
  ${((window.innerWidth < 960) ? 'min-width: 127px' : '')};
  ${((window.innerWidth < 960) ? 'height: 40px' : '')};
  ${((window.innerWidth < 960) ? 'padding: 3px' : '')};
  .MuiButton-label { 
    align-items: center;  
    justify-content: center; 
    display: flex; 
    flex-direction: column;
  }
`;  

const NextButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey;
  align-self: center;
  width: 30%;
  flex-direction: column;
`; 

const SpaceButton = styled(PrimaryButton)`
  margin-top: 20px;  
  align-self: center;
  width: 30%;
`;