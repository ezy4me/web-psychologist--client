import TestDataGrid from '@/components/admin/datagrid/TestDataGrid';
import { Stack, Typography } from '@mui/material';
import useTestStore from '@store/testStore';
import { useEffect } from 'react';

const AdminTestPage = () => {
  const { tests, getTests } = useTestStore((state) => ({
    tests: state.tests,
    getTests: state.getTests,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getTests();
    };
    fetchData();
  }, []);
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Тесты</Typography>
      </Stack>
      <TestDataGrid />
    </>
  );
};

export default AdminTestPage;
