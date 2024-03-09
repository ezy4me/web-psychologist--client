import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Заголовок', width: 200 },
  { field: 'subtitle', headerName: 'Подзаголовок', width: 200 },
  { field: 'description', headerName: 'Описание', width: 300 },
  {
    field: 'isApproved',
    headerName: 'Одобрено',
    width: 120,
    renderCell: (params) => <div>{params.value ? 'Да' : 'Нет'}</div>,
  },
  { field: 'createdAt', headerName: 'Дата создания', width: 180 },
  {
    field: 'image',
    headerName: 'Изображение',
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt="Изображение" style={{ width: '100%', objectFit: 'cover' }} />
    ),
  },
  {
    field: 'psychologist',
    headerName: 'Психолог',
    width: 200,
    renderCell: (params) => (
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <img
          src={params.value.user.profile.image}
          alt={params.value.user.profile.name}
          style={{
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <span>{params.value.user.profile.name}</span>
      </Stack>
    ),
  },
];

const ArticleDataGrid = ({ data }: any) => {
  return (
    <Stack sx={{ width: '100%' }} direction={'column'} spacing={2}>
      <Typography variant="h5">Статьи</Typography>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Stack>
  );
};

export default ArticleDataGrid;
