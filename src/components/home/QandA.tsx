import styled from 'styled-components';
import { data } from '@/data/QandA.json';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type DataType = {
  question: string;
  answer: string;
};

const QAndA = () => {
  return (
    <>
      {data.map(({ question, answer }: DataType, index: number) => (
        <Accordion key={index} style={{ boxShadow: 'inherit', position: 'inherit' }}>
          <AccordionSummary style={{ padding: 0 }} expandIcon={<ExpandMoreIcon />}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <QuestionNumber>{index + 1}</QuestionNumber>
              <Typography fontWeight={'500'}>{question}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>{answer}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

const QuestionNumber = styled.div`
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4ba8ff;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
`;

export default QAndA;
