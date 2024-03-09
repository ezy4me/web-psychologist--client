import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import SchoolIcon from '@mui/icons-material/School';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Typography } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(0,176,255) 0%, rgb(0,195,255) 50%, rgb(0, 140, 255) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(0,176,255) 0%, rgb(0, 195, 255) 50%, rgb(0,140,255) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(0,176,255) 0%, rgb(0,195,255) 50%, rgb(0, 140, 255) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(0,176,255) 0%, rgb(0,195,255) 50%, rgb(0,140,255) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SchoolIcon />,
    2: <ScheduleIcon />,
    3: <RecommendIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Образование',
    text: 'Проверяем дипломы: высшее психологическое, гуманитарное и психотерапевтическое образование',
  },
  {
    label: 'Опыт работы',
    text: 'Рассматриваем специалистов с подтверждённой практикой от трёх лет',
  },
  {
    label: 'Рекомендации',
    text: 'Просим предоставить рекомендацию от супервизора, старших коллег или психологической ассоциации',
  },
];

const PsychologistSelection = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={6} connector={<ColorlibConnector />}>
        {steps.map((item) => (
          <Step key={item.label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="body1">{item.text}</Typography>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default PsychologistSelection;
