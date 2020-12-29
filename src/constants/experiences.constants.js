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
      icon: <PoorHygieneIcon style={{height:'25px'}}/>,
      whiteIcon: <WhitePoorHygieneIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'su', 
      name: 'Seemed Understaffed', 
      icon: <UnderstaffedIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteUnderstaffedIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'ct', 
      name: 'Could Not Get Tested', 
      icon: <NoIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteNoIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'lt', 
      name: 'Long Wait Time', 
      icon: <WaitTimeIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteWaitTimeIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'ca', 
      name: 'Confusing Process', 
      icon: <QuestionIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteQuestionIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'oc', 
      name: 'Overly Crowded', 
      icon: <CrowdedIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteCrowdedIcon style={{height:'25px'}}/>
    }, 
  ];

  export const POSITIVE_TAGS = [ 
    {  
      id: 'st', 
      name: 'Short Wait Time', 
      icon: <TimeIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteTimeIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'gh', 
      name: 'Good Hygiene', 
      icon: <FlashIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteFlashIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'fs', 
      name: 'Friendly Staff', 
      icon: <HeartIcon style={{width:'25px'}}/>,
      whiteIcon: <WhiteHeartIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'pp', 
      name: 'PPE Provided', 
      icon: <MaskIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteMaskIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'se', 
      name: 'Social Distancing', 
      icon: <DistancingIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteDistancingIcon style={{height:'25px'}}/>
    },  
    {  
      id: 'gm', 
      name: 'Good Bedside Manner', 
      icon: <BedIcon style={{height:'25px'}}/>,
      whiteIcon: <WhiteBedIcon style={{height:'25px'}}/>
    },
  ];