import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'email',
    headerName: 'Почта',
    width: 300,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Роль',
    width: 150,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => `${params.row.role?.name || ''}`,
  },
];

const UserDataGrid = ({ data }: any) => {
  return (
    <Stack sx={{ width: '100%' }} direction={'column'} spacing={2}>
      <Typography variant="h5">Пользователи</Typography>
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

export default UserDataGrid;
