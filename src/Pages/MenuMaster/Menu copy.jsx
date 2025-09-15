import { Card, CardContent, Typography , Button, Modal, Box, TextField, FormControl, FormLabel, Fade, Stack, Paper, Select, MenuItem, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

const modalStyle = {
 position: 'absolute',
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: { xs: '90%', sm: 450 }, // Responsive width
 bgcolor: 'background.paper',
 borderRadius: '12px',
 boxShadow: 24,
 p: 0, // Set padding to 0 and handle it inside the Paper component
 outline: 'none', // Remove the outline when modal is focused
};

function createData(name, calories, fat, carbs, protein) {
 return { name, calories, fat, carbs, protein };
}

const rows = [
 createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
 createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
 createData('Eclair', 262, 16.0, 24, 6.0),
 createData('Cupcake', 305, 3.7, 67, 4.3),
 createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function Menu() {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [menuMaster, setMenuMaster] = useState([]);
 const [token]= useLocalStorageEncrypt("token", null);
 const [searchQuery, setSearchQuery] = useState('');

 useEffect(() => {
  const fetchmenumaster = async () => {
   try {
    console.log('ini jalan use effect');
    const { data, status } = await Api1("/menu/all", "GET", {}, {
     Authorization: `Bearer ${token}`,
    });
    console.log(status);
    setMenuMaster(data.data);
    console.log(data.data);
   } catch (err) {
    console.error("Gagal ambil menu:", err);
   }
  };
  fetchmenumaster();
 }, [token]);

 const [formData, setFormData] = useState({
  namamenu: '',
  jenis: '', // <-- Updated field name
  urutan: '',
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
   ...prevState,
   [name]: value
  }));
 };

 const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  handleClose();
 };
 
 const filteredRows = rows.filter(row =>
  row.name.toLowerCase().includes(searchQuery.toLowerCase())
 );

 return (
  <>
   <Card>
    <CardContent>
     <Typography variant="h6" fontWeight="bold">Master Menu</Typography>
   
    </CardContent>
   </Card>
   <TableContainer component={Paper}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
     <Button onClick={handleOpen} variant="contained" color="primary">Tambah Master Menu</Button>
     <TextField
      label="Cari Dessert"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      size="small"
     />
    </Box>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
      <TableRow>
       <TableCell>Dessert (100g serving)</TableCell>
       <TableCell align="right">Calories</TableCell>
       <TableCell align="right">Fat&nbsp;(g)</TableCell>
       <TableCell align="right">Carbs&nbsp;(g)</TableCell>
       <TableCell align="right">Protein&nbsp;(g)</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {filteredRows.map((row) => (
       <TableRow
        key={row.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
       >
        <TableCell component="th" scope="row">
         {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>
   </TableContainer>

   <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <Fade in={open}>
     <Box sx={modalStyle}>
      <Paper component="form" onSubmit={handleSubmit} elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
       <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Tambah Master Menu
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
         Silakan isi formulir di bawah ini.
        </Typography> */}
       </Box>

       <Stack spacing={3} sx={{ p: 3 }}>
        <FormControl fullWidth>
         <TextField
          id="namamenu"
          name="namamenu"
          label="Nama Menu"
          value={formData.namamenu}
          onChange={handleChange}
          variant="outlined"
          fullWidth
       //  helperText="Contoh: Budi Santoso"
         />
        </FormControl>
        
        <FormControl fullWidth>
                    <InputLabel id="jenis-label">Jenis</InputLabel>
                    <Select
                        labelId="jenis-label"
                        id="jenis"
                        name="jenis"
                        value={formData.jenis}
                        label="Jenis"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="File">File</MenuItem>
                        <MenuItem value="Folder">Folder</MenuItem>
                    </Select>
        </FormControl>

        <FormControl fullWidth>
         <TextField
          id="urutan"
          name="urutan"
          label="Urutan" // Added label for better UX
          type="number"
          value={formData.urutan}
          onChange={handleChange}
          variant="outlined"
          fullWidth
         />
        </FormControl>
        
        <Button type="submit" variant="contained" size="large" fullWidth>
         Submit
        </Button>
       </Stack>
      </Paper>
     </Box>
    </Fade>
   </Modal>
  </>
 );
}