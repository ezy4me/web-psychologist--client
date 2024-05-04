import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowEditStopReasons,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Typography, Modal, Box } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import useAuthStore from '@store/authStore';
import usePsychologistStore from '@/store/psychologistStore';
import Chat from '../Chat';

const ChatsDataGrid = () => {
  const user = useAuthStore((state) => state.user);

  const { chats, getPsychologistChats } = usePsychologistStore((state) => ({
    chats: state.chats,
    getPsychologistChats: state.getPsychologistChats,
  }));

  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<any>(null);

  const fetchData = async () => {
    await getPsychologistChats(user.id);
  };

  React.useEffect(() => {
    fetchData();
  }, [getPsychologistChats, user.id]);

  React.useEffect(() => {
    if (chats) {
      setRows(chats);
    }
  }, [chats]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const openChatModal = (patient: any) => {
    setSelectedPatient(patient);
    console.log(patient);
    
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPatient(null);
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Почта',
      width: 200,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => `${params.row.patient?.email || 'Аноним'}`,
    },
    {
      field: 'patient',
      headerName: 'Имя',
      width: 150,
      editable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.patient?.profile?.name || 'Аноним'}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      width: 200,
      getActions: ({ id }) => {
        const chat = rows.find((c) => c.id === id);
        if (chat && chat.status) {
          return [
            <GridActionsCellItem
              icon={<ChatIcon />}
              label="Chat"
              color="inherit"
              onClick={() => openChatModal(chat.patient)}
            />,
          ];
        } else {
          return [];
        }
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        onRowEditStop={handleRowEditStop}
        slotProps={{
          toolbar: { setRows },
        }}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Чат
          </Typography>
          <Chat patient={selectedPatient} />
        </Box>
      </Modal>
    </>
  );
};

export default ChatsDataGrid;
