import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Dialog, DialogTitle, IconButton } from '@material-ui/core'; 
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InitialExperiences from '@components/experiences/initial-experiences';
import FeedbackExperiences from '@components/experiences/feedback-experiences';
import SubmitExperiences from '@components/experiences/submit-experiences';

import ExperienceService from '@services/experience.service';
import ModalService from '@services/modal.service';

import { NEGATIVE_TAGS } from '@constants/experiences.constants'; 
import { POSITIVE_TAGS } from '@constants/experiences.constants';

import { AppContext } from '@contexts/app.context';

export default function ShareExperiencesModal(props) {

  const { appState } = useContext(AppContext);  

  const modalService = ModalService.getInstance(); 
  const experienceService = ExperienceService.getInstance(); 

  modalService.registerModal('promptShareExperiences'+props.testTitle, toggleModal);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');  
  const [currentScreen, setCurrentScreen] = useState(0);   
  const [experience, setExperiences] = useState({  
    edited: false,
    positive: false, 
    tags: []
  }); 
  const [experienceResult, setExperienceResult] = useState({  
    title: '', 
    content: ''
  });

  const steps = [
    <InitialExperiences 
      toPos={() => setCurrentScreen(1)} 
      toNeg={() => setCurrentScreen(2)} 
      payload={experience} 
      handler={setExperiences}
    />,  
    <FeedbackExperiences action={() => handleSubmit()} payload={experience} handler={setExperiences} tags={POSITIVE_TAGS}/>,
    <FeedbackExperiences action={() => handleSubmit()} payload={experience} handler={setExperiences} tags={NEGATIVE_TAGS}/>,
    <SubmitExperiences 
      action={() => handleClose()} 
      testTitle={props.testTitle} 
      title={experienceResult.title} 
      content={experienceResult.content}
    />
  ];

  function toggleModal(isOpen, scrollType) {
    setOpen(isOpen);
    if (isOpen === true) {
      setScroll(scrollType);
    }
  }

  function handleClose() {   
    toggleModal(false);
    setExperiences({
      edited: false,
      positive: false, 
      tags: [] 
    });
    setCurrentScreen(0);
  }  

  async function handleSubmit(){   
    experienceService.add(appState.sessionId, {facilityId: props.facilityId, positive: experience.positive, tags: experience.tags})
      .then((result, i) => {   
        setExperienceResult({
          title: 'Thank you!', 
          content: 'Thank you for submitting your experience at '+props.testTitle
        });
        setCurrentScreen(3);
      })
      .catch((err) => {
        setExperienceResult({
          title: 'Please try again tomorrow.', 
          content: `Experiences can only be shared once per day. You left a review of `+props.testTitle+` less than 24 hours ago.
                    Please wait 24 hours from the time you last shared an experience before sharing another. Thank you!`
        });
        setCurrentScreen(3);
      });
  } 

  function handleBack() { 
    if(currentScreen === 2){ 
      setCurrentScreen(currentScreen-2);
    } else { 
      setCurrentScreen(currentScreen-1);
    }
  } 

  return (
      <ShareExperienceContainer
        open={open}
        onClose={() => {
          toggleModal(false);
        }}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        { currentScreen !== 3 ? 
        <Title>
          {props.testTitle}
        </Title> : null
        }
        { currentScreen !== 3 
         ?
          <CloseButton aria-label="close" onClick={() => handleClose()}>
            <CloseIcon />
          </CloseButton>    
          : null 
        }
        { currentScreen === 1 || currentScreen === 2
         ? 
          <BackButton aria-label="close" onClick={() => handleBack()}>
            <ChevronLeftIcon />
          </BackButton>   
          : null
        }  
        { 
           steps[currentScreen]
        }

      </ShareExperienceContainer> 
  );
}

const ShareExperienceContainer = styled(Dialog)`
  .MuiPaper-rounded {
    border-radius: 30px;
    padding: 25px;  
    width: 70%; 
    height: 57%;
  }
`;

const Title = styled(DialogTitle)`
  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 24px;
    margin: 15px;
  }
`; 

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
`;   

const BackButton = styled(IconButton)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
`; 