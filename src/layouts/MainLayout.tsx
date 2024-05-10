import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    if (user?.role!) {
      if (user.role.name === 'PSYCHOLOGIST') navigate(`/psychologist/articles`);
      else if (user.role.name === 'ADMIN') navigate(`/admin/users`);
      else navigate(`/`);
    }
  }, [user]);

  return <Outlet />;
};

export default MainLayout;
