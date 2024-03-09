import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ArticleEditForm from './ArticleEditForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ArticleEditModal = ({ articleId, updateData }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeModal = async () => {
    await updateData();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Изменить</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ArticleEditForm articleId={articleId} callBack={closeModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default ArticleEditModal;
