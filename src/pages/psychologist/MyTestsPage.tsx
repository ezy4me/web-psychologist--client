import TestDataGrid from '@/components/psychologist/datagrid/TestsDataGrid';
import { Typography, Stack } from '@mui/material';

const MyTestPage = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Тесты</Typography>
      </Stack>
      <TestDataGrid />
    </>
  );
};

export default MyTestPage;
