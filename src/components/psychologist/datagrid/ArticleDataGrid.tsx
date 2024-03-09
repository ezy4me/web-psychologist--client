import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import useAuthStore from '@/store/authStore';
import useArticleStore from '@/store/articleStore';
import { Article } from '@/types';
import ArticleEditModal from '@/components/common/forms/article/ArticleEditModal';
import ArticleAddModal from '@/components/common/forms/article/ArticleAddModal';

const ArticleDataGrid = () => {
  const user = useAuthStore((state) => state.user);

  const { articles, getPsychologistArticles, removeArticle } = useArticleStore((state) => ({
    articles: state.articles,
    getPsychologistArticles: state.getPsychologistArticles,
    removeArticle: state.removeArticle,
  }));

  const [rows, setRows] = useState<Article[]>([]);

  const fetchData = async () => {
    await getPsychologistArticles(user.id);
  };

  useEffect(() => {
    fetchData();
  }, [getPsychologistArticles, user.id]);

  useEffect(() => {
    if (articles) {
      setRows(articles);
    }
  }, [articles]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await removeArticle(id.toString());
    setRows(rows.filter((row: any) => row.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Заголовок', width: 200 },
    { field: 'subtitle', headerName: 'Подзаголовок', width: 300 },
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      width: 200,
      getActions: ({ id }) => {
        return [
          <ArticleEditModal articleId={id} updateData={fetchData} />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <ArticleAddModal updateData={fetchData} />
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
    </>
  );
};

export default ArticleDataGrid;
