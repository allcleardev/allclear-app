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
            {props.tags[i].icon}
            {props.tags[i].name}
          </TagButton> 
          <TagButton color={'primary'} variant={isTagSelected(props.tags[i+1].id)} onClick={() => handleSelection(props.tags[i+1].id)}> 
            {props.tags[i+1].icon}
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
        What made your testing experience {props.payload.positive ? 'posative' : 'negative'}
    </Content>   
    
     <Actions>    
      { 
        renderTags()   
      }
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