import TestDataGrid from '@/components/admin/datagrid/TestDataGrid';
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
      <TestDataGrid data={tests} />
    </>
  );
};

export default AdminTestPage;
