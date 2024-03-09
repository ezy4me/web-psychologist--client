import { useEffect } from 'react';
import usePsychologistStore from '@store/psychologistStore';
import PsychologistDataGrid from '@/components/admin/datagrid/PsychologistDataGrid';

const AdminPsychologistPage = () => {
  const { psychologists, getPsychologists } = usePsychologistStore((state) => ({
    psychologists: state.psychologists,
    getPsychologists: state.getPsychologists,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getPsychologists();
    };
    fetchData();
  }, []);
  return (
    <>
      <PsychologistDataGrid data={psychologists} />
    </>
  );
};

export default AdminPsychologistPage;
