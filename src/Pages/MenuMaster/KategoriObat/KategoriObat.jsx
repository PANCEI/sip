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
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { useState } from "react";
import {useEffect} from "react";
import PopUpCostum from "../../../components/PopUpCostum";
import KategoriObatForm from "./KategoriObatForm";
import { Toast } from "../../../components/Toast";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { alertConfirmation } from "../../../components/alertConfirmation";
export default function KategoriObat() {
  const bukaToast = Toast();
    const [loadingData, setLoadingData] = useState(false);
    const [masterKategori, setMasterKategori] = useState([]);
     const [searchQuery, setSearchQuery] = useState("");
    const [page, setpage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [token]= useLocalStorageEncrypt('token', null);
    const [editKategori, setEditKategori] = useState(null);
    const [buka , setBuka] = useState(false);
     const bukaModal = () => setBuka(true);
     const {confirm} = alertConfirmation();
      const handleClose = () => {
    setBuka(false);
    setEditKategori(null); // Clear edit data when closing
  };
  const handleEditKategori = (kategori) => {
    setEditKategori(kategori);
    bukaModal();
  };
    console.log(token);
    // get data master kategori
    const fetchMasterKategori = async ()=>{
      //  
      setLoadingData(true);
      try{
        const {data , status} = await Api1(
          '/all-katogori-medicine',
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if(status == 200){
         console.log("data master kategori : ", data.data);
         setMasterKategori(data.data);
         console.log("master kategori state : ", masterKategori);
        }
      }catch(error){
        console.log("gagal mendapatkan data : ". error);
      }finally{
setLoadingData(false);
      }
    }
    useEffect(()=>{
      fetchMasterKategori();
    },[token]);
     const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setpage(0);
  };
    const handleChangePage = (event, newPage) => {
      setpage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setpage(0);
    };
    const filteredkategori = masterKategori.filter((kategori) =>
    kategori.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedKategori = filteredkategori.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

const handleFormSubmit = async (formData) => {
  console.log("Data yang dikirim dari form:", formData);
  handleClose();
  // Tambahkan logika untuk mengirim data ke server di sini
  try{
    // cek jika formdata memiiki id maka itu adalah edit
    if(formData.id){
console.log("melakukan edit data kategori");
const {data, status} = await Api1("/update-kategori-medicine", "PUT", formData, {
        Authorization: `Bearer ${token}`,
      }
      );
      console.log("data edit kategori : ", data);
      console.log("status", status);
      if(status ==200){
        bukaToast('success', 'Berhasil mengedit kategori obat');
        fetchMasterKategori();
      }
    }else{
      // tambah data baru
      const {data, status} = await Api1("/add-kategori-medicine", "POST", formData, {
        Authorization: `Bearer ${token}`,
      }
      );
      if(status ==200){
        bukaToast('success', 'Berhasil menambahkan kategori obat');
        fetchMasterKategori();
      }else{
        bukaToast('error', 'Gagal menambahkan kategori obat');
      }
      console.log("data tambah kategori : ", data);
      console.log("status", status);
    }
  }catch(error){
    console.log("gagal mengirim data : ", error);
    bukaToast('error', 'Terjadi kesalahan saat mengirim data');
  }
}
const handleDeleteKategori = async (kategoriId) => {
//console.log("Menghapus kategori dengan ID:", kategoriId);
const useConfirmed = await confirm({
   text: "Anda tidak akan bisa mengembalikan data ini!"
})
if (useConfirmed){
  console.log("gass delete data kategori id : ", kategoriId);
  try{
// mela[ukan delete data]
const {data , status} = await Api1('/delete-kategori-medicine', "DELETE", {id: kategoriId}, {
  Authorization: `Bearer ${token}`,
});
console.log("data delete kategori : ", data);
console.log("status delete kategori : ", status);
if(status ==200){
  fetchMasterKategori();
  bukaToast('success', 'Berhasil menghapus kategori obat');
}
  }catch(error){
    console.log('gagal menghapus kategori : ', error);
    bukaToast('error', 'Gagal menghapus kategori obat');
  }
}
}
  return (
      <>
    <Box sx={{p:3 , bgcolor:"grey.100", minHeight:"70vh" , zIndex:1}}>
        <Card sx={{mb:3, borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.05)"}}>
         <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Kategori Obat
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
          width: '40%',
          position: 'relative',
        }}>
            {/* untuk body table */}
            <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
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
                  setEditKategori(null);
                  bukaModal();
                }}
                >
                    Tambah Kategori
                </Button>
                <TextField
                size="small"
                variant="outlined"
                label="Cari Kategori"
                value={searchQuery}
                onChange={handleSearchChange}
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
                        <TableCell>Kategori</TableCell>
                        <TableCell>Deskripsi</TableCell>
                        <TableCell>Aksi</TableCell>                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingData ?(
                          Array.from(new Array(1)).map((_, index) => (
                            <TableRow key={index}>
                            <TableCell><Skeleton variant="text" /></TableCell>
                            <TableCell><Skeleton variant="text" /></TableCell>
                            <TableCell align="center"><Skeleton variant="rectangular" width={60} height={36} sx={{ margin: 'auto' }} /></TableCell>
                            </TableRow>
                              ))
                        ): paginatedKategori.length > 0 ? (
                          paginatedKategori.map((kategori) => (
                            <TableRow key={kategori.id}>
                              <TableCell>{kategori.nama_kategori}</TableCell>
                              <TableCell>{kategori.deskripsi}</TableCell>
                              <TableCell align="center" size="small">
                                <Tooltip title="Edit Kategori">
                                  <IconButton
                                  color="primary"
                                  aria-label="Edit Kategori"
                                  onClick={()=>handleEditKategori(kategori)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Hapus Kategori">
                                  <IconButton
                                  color="error"
                                  aria-label="Hapus Kategori"
                                  onClick={()=> handleDeleteKategori(kategori.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                              </TableRow>
                          ))
                        ) :(
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
             <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredkategori.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
            />
            </Paper>
        </Box>
      
    </Box>
    <PopUpCostum
        open={buka}
        handleClose={handleClose}
        title={editKategori ? "Edit Kategori Obat" : "Tambah Kategori Obat"}
      >
        {/* Konten modal untuk tambah atau edit kategori obat */}
        
        <KategoriObatForm
          onSubmit={handleFormSubmit}
          initialData={editKategori}
        />

    </PopUpCostum>

                </>
  );
}
