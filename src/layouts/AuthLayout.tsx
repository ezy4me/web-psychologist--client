import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';

const AuthLayout = () => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isPsychologist, setIsPsychologist] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = () => {
      if (user?.role?.name) {
        if (user.role.name === 'ADMIN') {
          setIsAdmin(true);
          navigate('/admin/');
        } else if (user.role.name === 'PSYCHOLOGIST') {
          setIsPsychologist(true);
          navigate('/psychologist/');
        }
      } else {
        setIsAdmin(false);
        setIsPsychologist(false);
      }
    };
    checkRole();
  }, [user]);
  return <Outlet />;
};

export default AuthLayout;
