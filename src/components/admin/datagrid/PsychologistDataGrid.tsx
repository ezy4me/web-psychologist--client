import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'user.email',
    headerName: 'Почта',
    width: 250,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user?.email}`,
  },
  {
    field: 'education',
    headerName: 'Образование',
    width: 250,
    editable: true,
  },
  {
    field: 'qualification',
    headerName: 'Квалификация',
    width: 250,
    editable: true,
  },
  {
    field: 'experience',
    headerName: 'Опыт',
    width: 250,
    editable: true,
  },
  {
    field: 'user.profile.name',
    headerName: 'Имя',
    width: 250,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.profile?.name!}`,
  },
  {
    field: 'user.profile.phone',
    headerName: 'Телефон',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.profile?.phone!}`,
  },
  {
    field: 'user.profile.gender',
    headerName: 'Пол',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.profile?.gender!}`,
  },
  {
    field: 'user.profile.birthday',
    headerName: 'Дата рождения',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.user.profile?.birthday!}`,
  },
];

const PsychologistDataGrid = ({ data }: any) => {
  return (
    <Stack sx={{ width: '100%' }} direction={'column'} spacing={2}>
      <Typography variant="h5">Психологи</Typography>
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

export default PsychologistDataGrid;
