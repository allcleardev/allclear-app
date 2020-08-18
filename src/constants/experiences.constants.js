import React from 'react';

import {ReactComponent as PoorHygieneIcon} from '@assets/images/poorHygiene-icon.svg'; 
import {ReactComponent as CrowdedIcon} from '@assets/images/crowded-icon.svg';
import {ReactComponent as WaitTimeIcon} from '@assets/images/wait-time-icon.svg';
import {ReactComponent as UnderstaffedIcon} from '@assets/images/understaffed-icon.svg';
import {ReactComponent as QuestionIcon} from '@assets/images/question-icon.svg';
import {ReactComponent as NoIcon} from '@assets/images/no-icon.svg';  

import {ReactComponent as FlashIcon} from '@assets/images/flash-icon.svg';  
import {ReactComponent as BedIcon} from '@assets/images/bed-icon.svg';  
import {ReactComponent as MaskIcon} from '@assets/images/mask-icon.svg';  
import {ReactComponent as TimeIcon} from '@assets/images/time-icon.svg';  
import {ReactComponent as HeartIcon} from '@assets/images/heart-icon.svg';  
import {ReactComponent as DistancingIcon} from '@assets/images/distancing-icon.svg'; 

export const NEGATIVE_TAGS = [ 
    {  
      id: 'ph', 
      name: 'Poor Hygiene', 
      icon: <PoorHygieneIcon />
    },  
    {  
      id: 'su', 
      name: 'Seemed Understaffed', 
      icon: <CrowdedIcon />
    },  
    {  
      id: 'ct', 
      name: 'Could Not Get Tested', 
      icon: <WaitTimeIcon />
    },  
    {  
      id: 'lt', 
      name: 'Long Wait Time', 
      icon: <UnderstaffedIcon />
    },  
    {  
      id: 'ca', 
      name: 'Confussing Appointment Process', 
      icon: <QuestionIcon />
    },  
    {  
      id: 'oc', 
      name: 'Overly Crowded', 
      icon: <NoIcon />
    }, 
  ];

  export const POSITIVE_TAGS = [ 
    {  
      id: 'st', 
      name: 'Short Wait Time', 
      icon: <TimeIcon />
    },  
    {  
      id: 'gh', 
      name: 'Good Hygiene', 
      icon: <FlashIcon />
    },  
    {  
      id: 'fs', 
      name: 'Friendly Staff', 
      icon: <HeartIcon />
    },  
    {  
      id: 'pp', 
      name: 'PPE Provided', 
      icon: <MaskIcon />
    },  
    {  
      id: 'se', 
      name: 'Social Distancing', 
      icon: <DistancingIcon />
    },  
    {  
      id: 'gm', 
      name: 'Good Bedside Manner', 
      icon: <BedIcon />
    },
  ];