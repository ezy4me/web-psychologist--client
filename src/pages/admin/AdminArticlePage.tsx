import ArticleDataGrid from '@/components/admin/datagrid/ArticleDataGrid';
import { Typography, Stack } from '@mui/material';

const AdminArticlePage = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Статьи</Typography>
      </Stack>
      <ArticleDataGrid />
    </>
  );
};

export default AdminArticlePage;
