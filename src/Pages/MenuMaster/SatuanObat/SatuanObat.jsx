import { Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Skeleton,
  Tooltip,
  IconButton,
  TablePagination, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
import { Api1 } from "../../../utils/Api1";4
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
// untuk menampilkan modal
import PopUpCostum from "../../../components/PopUpCostum";
// import form satuan obat
import SatuanObatForm from "./SatuanObatForm";
// import alert 
import { alertConfirmation } from "../../../components/alertConfirmation";
// import Toast 
import { Toast } from "../../../components/Toast";
// import edit icon dan delete icon dari mui material
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
export default function SatuanObat() {
  // statue untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");
  // untuk pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  // akhir pagination
  // state untuk loading
  const [loading, setLoading] = useState(false);
  const [satuanObat, setSatuanObat] = useState([]);
   const [token]= useLocalStorageEncrypt('token', null);
  //  state untuk edit satuan
  const [editSatuan, setEditSatuan] = useState(null);
// state untuk buka tutup modal
const [openModal, setOpenModal] = useState(false);
const [satuanObatEdit, setSatuanObatEdit] = useState(null);
// fungsi untuk buka modal
const handleOpenModal = () => {
  setOpenModal(true);
};
// fungsi untuk tutup modal
const handleCloseModal = () => {
  setOpenModal(false);
};
  // buat api untuk getdata satuan obat
  const fetchSatuanObat = async () => {
    setLoading(true);
    try{
      const {data, status} = await Api1('/all-satuan-medicine','GET',{},{
 Authorization: `Bearer ${token}`,
      }
    );
    console.log("Response data satuan obat:", data);
    console.log("Response status satuan obat:", status);
    if (status === 200){
    setSatuanObat(data.data);
    }
    }catch(error){
      console.error("Error fetching data satuan obat:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchSatuanObat();
  }, [token]);
  const handleFormSubmit = async (formData) => {
    console.log("Form data submitted:", formData);
    handleCloseModal();
    // Tambahkan logika untuk mengirim data ke server di sini
    try{
      const { data, status } = await Api1('/add-satuan-medicine', 'POST', formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Response data after form submission:", data);
      console.log("Response status after form submission:", status);
    }catch(error){
      console.error("Error submitting form data:", error);
    }

  }
  // fungsi untuk pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const filteredSatuanObat = satuanObat.filter((item) =>
    item.satuan.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedSatuanObat = filteredSatuanObat.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // akhir pagination
  
  return (
    <>
    <Box sx={{p:3, bgcolor:"grey.100" , minHeight:"70vh", zIndex:1}}>
   <Card sx={{mb:3, borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.05)"}}>
  <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Satuan Obat
            </Typography>
          </CardContent>
    </Card>
    {/* box untuk table */}
    <Box sx={ {width:"40%", position:"relative" ,}}>
       <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        {/* box untuk tombol header sama pencarian */}
        <Box
         sx={{
              display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid",
                borderColor: "grey.200",
                bgcolor: "grey.50",
                flexDirection: { xs: 'column', sm: 'row' }
              }}
        >
          {/* tombol tambah */}
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ borderRadius: "12px", fontWeight: "bold" }}
                sixe="small"
               onClick={()=>{
                setSatuanObatEdit(null);
                handleOpenModal();
               }}
                >
                    Tambah Satuan Obat
                </Button>
                {/* tombol cari */}
              <TextField
                size="small"
                variant="outlined"
                label="Cari Satuan Obat"
              
                slotProps={{
                    input: {
                    startAdornment: (
                      <InputAdornment position="start">
                    <SearchIcon color="action" />
                    </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      mt: { xs: 2, sm: 0 },
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    }}
                />
        </Box>
        {/* table */}
        <TableContainer>
      <Table>
        <TableHead>
          <TableRow
          sx={{
            "& th": {
                    fontWeight: "bold",
                    bgcolor: "primary.main",
                    color: "white",
                    },
          }}
          >
             <TableCell>Satuan</TableCell>
            <TableCell>Aksi</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
           {loading ?(
                                    Array.from(new Array(1)).map((_, index) => (
                                      <TableRow key={index}>
                                      <TableCell><Skeleton variant="text" /></TableCell>
                                    
                                      <TableCell align="center"><Skeleton variant="rectangular" width={60} height={36} sx={{ margin: 'auto' }} /></TableCell>
                                      </TableRow>
                                        ))
                                  ):paginatedSatuanObat.length> 0 ? (
                                    paginatedSatuanObat.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell align="center">{item.satuan}</TableCell>  
                                        <TableCell align="center" >
                                        <Tooltip title="Edit">
                                          <IconButton
                                            color="primary"
                                            onClick={() => {
                                              setSatuanObatEdit(item);
                                              handleOpenModal();
                                            }
                                            }
                                          >
                                            <EditIcon />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hapus">
                                          <IconButton
                                            color="error"
                                            >
                                            <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        </TableCell>
                                        </TableRow>
                                    ))
                                  ):(
                          <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Tidak ada data yang ditemukan.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                }
        </TableBody>

      </Table>
        </TableContainer>
        {/* pagination */}
        <TablePagination
          component="div"
          count={filteredSatuanObat.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
    </Paper>
    </Box>
    </Box>
    {/* popup modal untuk tambah dan edit satuan obat */}
   <PopUpCostum
    open={openModal}
    handleClose={handleCloseModal}
    title={satuanObatEdit ? "Edit Satuan Obat" : "Tambah Satuan Obat"}  
    >
    <SatuanObatForm
     initialData={satuanObatEdit}
     onSubmit={handleFormSubmit}
    />

      </PopUpCostum>
    
    </>
  );
}
