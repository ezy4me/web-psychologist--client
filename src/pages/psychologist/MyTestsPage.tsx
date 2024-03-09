import { Typography, Stack } from '@mui/material';
// import TestDataGrid from '@components/DataGrids/Psychologist/TestsDataGrid';

const MyTestPage = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Тесты</Typography>
      </Stack>
      {/* <TestDataGrid /> */}
    </>
  );
};

export default MyTestPage;
