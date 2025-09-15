import {Modal , Box, Fade, Typography, Paper} from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 450 },
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 0,
    outline: 'none',
};
export default function PopUpCostum({open, handleClose, title, children}) {
    return (
       <Modal
       open={open}
       onClose={handleClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
        <Fade in={open}>
            <Box sx={style}>
              <Paper elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight="bold" gutterBottom>
                {title}
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
          </Paper>
            </Box>
        </Fade>
       </Modal>
    )
}