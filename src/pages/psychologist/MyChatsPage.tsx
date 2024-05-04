import ChatsDataGrid from '@/components/psychologist/datagrid/ChatsDataGrid';
import { Typography, Stack } from '@mui/material';

const MyChatsPage = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h5">Мои чаты</Typography>
      </Stack>
      <ChatsDataGrid />
    </>
  );
};

export default MyChatsPage;
