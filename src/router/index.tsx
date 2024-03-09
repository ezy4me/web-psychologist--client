import AdminLayout from '@/layouts/AdminLayout';
import HomeLayout from '@/layouts/HomeLayout';
import MainLayout from '@/layouts/MainLayout';
import PsychologistLayout from '@/layouts/PsychologistLayout';

import AdminAnalyticsPage from '@/pages/admin/AdminAnalitycsPage';
import AdminArticlePage from '@/pages/admin/AdminArticlePage';
import AdminPage from '@/pages/admin/AdminPage';
import AdminPsychologistPage from '@/pages/admin/AdminPsychologistPage';
import AdminTestPage from '@/pages/admin/AdminTestPage';
import AdminUserPage from '@/pages/admin/AdminUserPage';

import NotFoundPage from '@/pages/common/NotFoundPage';

import MyArticlePage from '@/pages/psychologist/MyArticlePage';
import MyTestsPage from '@/pages/psychologist/MyTestsPage';
import PsychologistPage from '@/pages/psychologist/PsychologistPage';

import AboutPage from '@/pages/user/AboutPage';
import ArticleDetailPage from '@/pages/user/ArticleDetailPage';
import ArticlesPage from '@/pages/user/ArticlesPage';
import ForPsychologistPage from '@/pages/user/ForPsychologistPage';
import HomePage from '@/pages/user/HomePage';
import ProfilePage from '@/pages/user/ProfilePage';
import TestsPage from '@/pages/user/TestsPage';
import TestsPassingPage from '@/pages/user/TestsPassingPage';

import useAuthStore from '@/store/authStore';

import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const AuthGuard = ({ element }: { element: React.ReactNode }) => {
  const { accessToken } = useAuthStore();
  return accessToken ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/tests" element={<TestsPage />} />
        <Route path="/tests/:id" element={<TestsPassingPage />} />

        <Route path="/for-psychologist" element={<ForPsychologistPage />} />

        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/profile" element={<AuthGuard element={<ProfilePage />} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<AuthGuard element={<AdminPage />} />}>
          <Route path="/admin/" element={<AuthGuard element={<AdminAnalyticsPage />} />} />
          <Route path="/admin/users" element={<AuthGuard element={<AdminUserPage />} />} />
          <Route
            path="/admin/psychologists"
            element={<AuthGuard element={<AdminPsychologistPage />} />}
          />
          <Route path="/admin/articles" element={<AuthGuard element={<AdminArticlePage />} />} />
          <Route path="/admin/tests" element={<AuthGuard element={<AdminTestPage />} />} />
        </Route>
      </Route>

      <Route path="/psychologist" element={<PsychologistLayout />}>
        <Route path="/psychologist/" element={<AuthGuard element={<PsychologistPage />} />}>
          <Route
            path="/psychologist/articles"
            element={<AuthGuard element={<MyArticlePage />} />}
          />
          <Route path="/psychologist/tests" element={<AuthGuard element={<MyTestsPage />} />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
