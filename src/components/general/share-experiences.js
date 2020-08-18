import React, { useContext } from 'react'; 
import Button from '@material-ui/core/Button'; 
import Tooltip from '@material-ui/core/Tooltip';

import FormModal from '@general/modals/form-modal.js';
import ShareExperiencesModal from '@general/modals/share-experiences-modal';
import WaitExperiencesModal from '@general/modals/wait-experiences-modal';

import ModalService from '@services/modal.service';
import ExperienceService from '@services/experience.service';

import { AppContext } from '@contexts/app.context';

import { getCurrentDate } from '@util/general.helpers';

export default function ShareExperience(props) {
    const { appState } = useContext(AppContext);  
    const isLoggedIn = appState.sessionId ? true : false;

    const modalService = ModalService.getInstance();
    const experienceService = ExperienceService.getInstance();

    const handleShareExperience = () => {
        if(!isLoggedIn){  
            modalService.toggleModal('promptLoginExperiences', true); 
        } else {
            experienceService.search(appState.sessionId, {personId: appState.person.id}).then((result, i) => {
                isLessThan24(result.data.records, getCurrentDate())
                ? modalService.toggleModal('promptShareExperiences'+props.testTitle, true)
                : modalService.toggleModal('promptWaitExperiences', true);
            });
        }
      };

      const isLessThan24 = (records, fullDate) => {
        let showModal = true;
        records.forEach((record) => {   
            if(fullDate === record.createdAt.slice(0,10)){
                showModal = false;
            }
        });
        return showModal;
      };

  return (
    <> 
        <Tooltip title="Got tested here? Share your experience!" placement="left">
            <Button
                variant="contained"
                color="primary"
                style={{ borderRadius:15 }}
                onClick={handleShareExperience.bind(this)}
            >
                Share Experience
            </Button>
        </Tooltip>
        <FormModal
            titleText="To share your experience, please log in to an existing AllClear account, or create a new one." 
            modalName="promptLoginExperiences"
        />
        <ShareExperiencesModal
            testTitle={props.testTitle}
            facilityId={props.facilityId}
        />
        <WaitExperiencesModal />
    </>
  );
}


