import { Stack, Typography } from '@mui/material';

interface SectionTitleProps {
  text: string;
}

const SectionTitle = ({ text }: SectionTitleProps) => {
  const words = text.split(' ');
  const firstWord = words[0];
  const secondWord = words[1];

  return (
    <Stack
      height={'100%'}
      direction={'column'}
      spacing={4}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography textTransform={'uppercase'} fontWeight={'700'} variant="h4">
        {firstWord} <span style={{ color: '#4BA8FF' }}>{secondWord}</span>{' '}
        {words.slice(2).join(' ')}
      </Typography>
    </Stack>
  );
};

export default SectionTitle;
