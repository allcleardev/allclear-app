import React from 'react';
import styled from 'styled-components';

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

const WhitePoorHygieneIcon = styled(PoorHygieneIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteCrowdedIcon = styled(CrowdedIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteWaitTimeIcon = styled(WaitTimeIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  } 
  rect { 
    stroke: white;
  } 
  ellipse { 
    stroke: white;
  }
`;
const WhiteUnderstaffedIcon = styled(UnderstaffedIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteQuestionIcon = styled(QuestionIcon)`
  path {
    stroke: white; 
    fill: white;
  }
  line { 
    stroke: white;
  }
`;

const WhiteNoIcon = styled(NoIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  } 
  circle { 
    stroke: white;
  }
`;

const WhiteFlashIcon = styled(FlashIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteBedIcon = styled(BedIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteMaskIcon = styled(MaskIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;
const WhiteTimeIcon = styled(TimeIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  } 
  rect { 
    stroke: white;
  } 
`;
const WhiteHeartIcon = styled(HeartIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;

const WhiteDistancingIcon = styled(DistancingIcon)`
  path {
    stroke: white;
  }
  line { 
    stroke: white;
  }
`;

export const NEGATIVE_TAGS = [ 
    {  
      id: 'ph', 
      name: 'Poor Hygiene', 
      icon: <PoorHygieneIcon />,
      whiteIcon: <WhitePoorHygieneIcon />
    },  
    {  
      id: 'su', 
      name: 'Seemed Understaffed', 
      icon: <UnderstaffedIcon />,
      whiteIcon: <WhiteUnderstaffedIcon />
    },  
    {  
      id: 'ct', 
      name: 'Could Not Get Tested', 
      icon: <NoIcon />,
      whiteIcon: <WhiteNoIcon />
    },  
    {  
      id: 'lt', 
      name: 'Long Wait Time', 
      icon: <WaitTimeIcon />,
      whiteIcon: <WhiteWaitTimeIcon />
    },  
    {  
      id: 'ca', 
      name: 'Confusing Process', 
      icon: <QuestionIcon />,
      whiteIcon: <WhiteQuestionIcon />
    },  
    {  
      id: 'oc', 
      name: 'Overly Crowded', 
      icon: <CrowdedIcon />,
      whiteIcon: <WhiteCrowdedIcon />
    }, 
  ];

  export const POSITIVE_TAGS = [ 
    {  
      id: 'st', 
      name: 'Short Wait Time', 
      icon: <TimeIcon />,
      whiteIcon: <WhiteTimeIcon />
    },  
    {  
      id: 'gh', 
      name: 'Good Hygiene', 
      icon: <FlashIcon />,
      whiteIcon: <WhiteFlashIcon />
    },  
    {  
      id: 'fs', 
      name: 'Friendly Staff', 
      icon: <HeartIcon />,
      whiteIcon: <WhiteHeartIcon />
    },  
    {  
      id: 'pp', 
      name: 'PPE Provided', 
      icon: <MaskIcon />,
      whiteIcon: <WhiteMaskIcon />
    },  
    {  
      id: 'se', 
      name: 'Social Distancing', 
      icon: <DistancingIcon />,
      whiteIcon: <WhiteDistancingIcon />
    },  
    {  
      id: 'gm', 
      name: 'Good Bedside Manner', 
      icon: <BedIcon />,
      whiteIcon: <WhiteBedIcon />
    },
  ];