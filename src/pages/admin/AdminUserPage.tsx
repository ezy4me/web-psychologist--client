import UserDataGrid from '@/components/admin/datagrid/UserDataGrid';
import useUserStore from '@store/userStore';
import { useEffect } from 'react';

const AdminUserPage = () => {
  const { users, getUsers } = useUserStore((state) => ({
    users: state.users,
    getUsers: state.getUsers,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };
    fetchData();
  }, []);
  return (
    <>
      <UserDataGrid data={users} />
    </>
  );
};

export default AdminUserPage;
