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
export default function KategoriObat() {
    const [loadingData, setLoadingData] = useState(false);
    const [masterKategori, setMasterKategori] = useState([]);
    const [page, setpage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [token]= useLocalStorageEncrypt('token', null);
    const [editKategori, setEditKategori] = useState(null);
    const [buka , setBuka] = useState(false);
     const bukaModal = () => setBuka(true);
      const handleClose = () => {
    setBuka(false);
    setEditKategori(null); // Clear edit data when closing
  };
    console.log(token);
    // get data master kategori
    const fetchMasterKategori = async ()=>{
      //  
      try{
        const {data , status} = await Api1(
          '/all-katogori-medicine',
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
      }catch(error){
        console.log("gagal mendapatkan data : ". error);
      }finally{

      }
    }
    useEffect(()=>{
      fetchMasterKategori();
    },[token]);
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
                        ): (
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
            </Paper>
        </Box>
      
    </Box>
    <PopUpCostum
        open={buka}
        handleClose={handleClose}
        title={editKategori ? "Edit Kategori Obat" : "Tambah Kategori Obat"}
      >
        {/* Konten modal untuk tambah atau edit kategori obat */}
        


    </PopUpCostum>

                </>
  );
}
