import {
  Card,
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
  Switch,
  Tooltip,
  IconButton,
  TablePagination,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterMitraForm from "./MasterMitraForm";
import { Api1 } from "../../../utils/Api1";
import EditIcon from '@mui/icons-material/Edit';
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { useEffect } from "react";
import { Toast } from "../../../components/Toast";
export default function MasterMitra() {
    const [loadngData ,setLoadingData] = useState(false);
    const [open , setOpen] = useState(false);
    const [editData , setEditData] = useState (null);
    const [token] = useLocalStorageEncrypt("token", null);
    const [masterMitra, setMasterMitra] = useState ([]);
    const [pencarian, setPencarian] = useState ("");
    const [rowsPerPage, setRowsPerPage] = useState (10);
    const [page, setPage] = useState (0);
    const ShowToast = Toast();
     const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    // ambil semua data mitra
    const fetchAllMitra = async () =>{
      setLoadingData(true);
      try{
        const {data , status} = await Api1(
          '/all-mitra',
          'GET',
          {},
          {Authorization: `Bearer ${token}`}

        );
        if (status === 200){
          setMasterMitra (data.data);
        }
        console.log("data mitra:", data);
      }catch(error){
        console.error("gagal mengambil data mitra:", error);
      }finally{
        setLoadingData(false);
      }
    }
    useEffect (()=>{
      fetchAllMitra();
    },[token]);
    
    // ambil sema data dar form
    const handleFormSubmit = async (form) => {
      handleClose();
      setLoadingData (true);
      console.log("Data submitted:", form);
      try{
        if(form.flag_delete === "tidak"){
          const {data, status} = await Api1(
            '/add-mitra',
            'PUT',
            form,
            {Authorization: `Bearer ${token}`}
          );
          if (status === 200){
            fetchAllMitra();
            ShowToast("success", "Data Mitra Berhasil Ditambahkan");
        }
        }else{
          const {data, status} = await Api1(
            '/update-master-mitra',
            'PUT',
            form,
            {Authorization: `Bearer ${token}`}
          );
          if (status === 200){
            fetchAllMitra();
            ShowToast("success", "Data Mitra Berhasil Diupdate");
        }
        }
      
    }catch(error){
        console.error("Error submitting data:", error);
    }finally{
        setLoadingData(false);
    }
    
    };
    //  filter untuk data mitra
    const filteredMitra = masterMitra.filter((mitra) => mitra.nama_mitra.toLowerCase().includes(pencarian.toLowerCase()));
     const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
   const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleToggleStatus = async (item) => {
  //  console.log("Toggled status for item:", item);
    setLoadingData(true);
    try{
      const newStatus = item.flag_delete === 1 ? 0 : 1;
      const {data, status} = await Api1(
        '/update-flag-mitra',
        'PUT',
        {
          kode_mitra: item.kode_mitra,
          flag_delete: newStatus,
        },
        {Authorization: `Bearer ${token}`}
      );
      if (status === 200){
         ShowToast("success", 'berhasil ubah status');
      setMasterMitra((prevMitra) =>
        prevMitra.map((mitra) =>
          mitra.kode_mitra === item.kode_mitra
            ? { ...mitra, flag_delete: newStatus }
            : mitra
        )
        
      );
     
      }

    }catch(error){
      console.error("Error toggling status:", error);
    }finally{
      setLoadingData(false);
    }
  }
    // untuk edit data masster obat
  const handleEdit =(item) =>{
  //  console.log(item);
    setEditData (item);
    handleOpen();

  }
  return (
    <>
    <Box sx={{ p: 2, bgcolor: "grey.100", minHeight: "90vh" }}>
        {/* awal car  d header */}
     <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Master Mitra
              </Typography>
            </CardContent>
          </Card>
          {/* akhir card reader */}
          <Box sx={{ width: "80%", position: "relative" }}>
            <Paper sx={ { 
                borderRadius:2,
                overflow:"hidden",
                boxShadow:2
            }}>
                {/* box untuk tombol tambah dan serachimg */}
                <Box
                sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    p:2,
                    borderBottom:"ipx solid",
                    borderColor:"grey.300",
                    bgcolor:"grey.50",
                    flexDirection:{xs:"column", sm:"row"},
                }}
                >
                    {/* tombol tambah */}
                    <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon></AddIcon>}
                    sx={{borderRadius:"12px", fontWeight:"bold"}}
                    onClick={()=>{
                      setOpen(true)
                    }}
                    >
                        Tambah Mitra
                    </Button>
                    {/* ahir tombol tambah */}
                    {/* awal tombol pencarian */}
                    <TextField
                    label="Cari Master Mitra"
                    variant="outlined"
                    size="small"
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
                    >
                    
                    </TextField>
                    {/* akhir tombol pencarian */}
                </Box>
                {/* akhir box */}
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
                            <TableCell>Kode Mitra</TableCell>
                            <TableCell>Nama Mitra</TableCell>
                            <TableCell>Alamat</TableCell>
                            <TableCell>No Telepon</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadngData?(
                                Array.from({ length: 1 }).map((_, i) => (
                            <TableRow key={i}>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                         
                            <TableCell>
                                <Skeleton variant="rectangular" width={60} height={36} />
                            </TableCell>
                            </TableRow>
                             ))  
                ): filteredMitra.length > 0 ? (
                  filteredMitra.map((mitra, i) => (
                    <TableRow key={i}>
                      <TableCell>{mitra.kode_mitra}</TableCell>
                      <TableCell>{mitra.nama_mitra}</TableCell>
                      <TableCell>{mitra.alamat}</TableCell>
                      <TableCell>{mitra.no_telepon}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            mitra.flag_delete === 1
                              ? "Klik untuk mengaktifkan"
                              : "Klik untuk menonaktifkan"
                          }
                        >
                          <Switch
                            checked={mitra.flag_delete === 0}
                            onChange={() => handleToggleStatus(mitra)}
                            color={mitra.flag_delete === 1 ? "error" : "success"}
                          />
                        </Tooltip>
                        {mitra.flag_delete === 1 ? "Nonaktif" : "Aktif"}
                      </TableCell>
                      <TableCell>
                         <Tooltip
                        color="primary"
                        aria-label="Edit Master Obat"
                        onClick={()=>handleEdit(mitra)}
                        >
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ):(
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
                        </TableBody>
                    </Table>
                </TableContainer>
              {/* Akhir table */}
              {/* awal pagination */}
              <TablePagination
                component="div"
                count={filteredMitra.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
              />
              {/* akhir pagipnation */}
            </Paper>
          </Box>
    </Box>
    {/* modal untuk tambah data dan edit */}
    <PopUpCostum
    open={open}
    handleClose={handleClose}
    title={editData ? "Edit Mitra" : "Tambah Mitra"}
    >
        {/* isi form */}
        <MasterMitraForm
        initialData={editData}
        onSubmit={handleFormSubmit}
        >
        </MasterMitraForm>
        {/* akhir isi form */}
    </PopUpCostum>
    {/* akhir modal */}
   
    </>
  );
}
