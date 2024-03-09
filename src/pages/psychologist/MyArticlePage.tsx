import ArticleDataGrid from '@/components/psychologist/datagrid/ArticleDataGrid';
import { Typography, Stack } from '@mui/material';

const MyArticlePage = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Статьи</Typography>
      </Stack>
      <ArticleDataGrid />
    </>
  );
};

export default MyArticlePage;
