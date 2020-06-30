import React, { useContext } from 'react'; 
import Button from '@material-ui/core/Button'; 
import Tooltip from '@material-ui/core/Tooltip';

import PromptLoginModal from '@general/modals/prompt-login-modal';  
import WaitExperiencesModal from '@general/modals/wait-experiences-modal'; 
import ShareExperiencesModal from '@general/modals/share-experiences-modal';

import ModalService from '@services/modal.service';  

import { AppContext } from '@contexts/app.context';

export default function RateExperience() {   
    const { appState } = useContext(AppContext);  
    const isLoggedIn = appState.sessionId ? true : false;

    const modalService = ModalService.getInstance();  

    const handleRateExperience = async () => {     
        if(!isLoggedIn){  
            modalService.toggleModal('promptLogin', true); 
        } else {   
            modalService.toggleModal('promptRateExperiences', true);       
        }    
      };

  return (
    <> 
        <Tooltip title="Got tested here? Share your experience!" placement="left">
            <Button
                variant="contained"
                color="primary"
                style={{ borderRadius:15 }}
                onClick={handleRateExperience.bind(this)}
            >
                Share Experience
            </Button>   
        </Tooltip>
        <PromptLoginModal /> 
        <WaitExperiencesModal /> 
        <ShareExperiencesModal />
    </>
  );
}


