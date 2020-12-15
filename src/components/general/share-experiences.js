import React, { useContext } from 'react'; 
import Button from '@material-ui/core/Button'; 
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import FormModal from '@general/modals/form-modal.js';
import ShareExperiencesModal from '@general/modals/share-experiences-modal';
import PrimaryButton from '@general/buttons/primary-button';

import ModalService from '@services/modal.service';
import ExperienceService from '@services/experience.service';

import { AppContext } from '@contexts/app.context';

export default function ShareExperience(props) {
    const { appState } = useContext(AppContext);  
    const isLoggedIn = appState.sessionId ? true : false;
    const experienceService = ExperienceService.getInstance();

    const history = useHistory();

    const modalService = ModalService.getInstance();

    const handleShareExperience = () => {
        if(!isLoggedIn){
            modalService.toggleModal('promptLoginExperiences', true);
        } else {
            experienceService.limit(appState.sessionId, props.facilityId).then((result, i) => {
                modalService.toggleModal('promptShareExperiences'+props.testTitle, true);
            }).catch((error) => {
                modalService.toggleModal('promptRateLimit', true);
            });
        }
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
            actions = {  
                <>
                    <SubmitButton color={'primary'} variant={'contained'} onClick={() => history.push('/sign-in')}>
                        Login
                    </SubmitButton>
                    <CreateAccountButton style={{ marginTop: 10 }} onClick={() => history.push('/sign-up')}>
                        Create Account
                    </CreateAccountButton>  
                </>
            }
        />
        <FormModal
            titleText="Please try again tomorrow."  
            contentText={`To help ensure authenticity, you'll need to wait until tomorrow 
                          to share your Experience at ${props.testTitle} again. Thank you!`}
            modalName="promptRateLimit"  
            actions = {  
                <> 
                    <SubmitButton 
                        color={'primary'} 
                        variant={'contained'} 
                        onClick={() => modalService.toggleModal('promptRateLimit', false)}
                    >
                        Done
                    </SubmitButton>
                </>
            }
        />
        <ShareExperiencesModal
            testTitle={props.testTitle}
            facilityId={props.facilityId}
        />
    </>
  );
}

const SubmitButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey;
`;

const CreateAccountButton = styled(PrimaryButton)`
  box-shadow: 0px 0px 10px 5px lightGrey;
  margin-top: 10px;
`;
