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
import { useState , useEffect } from "react";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterPoliForm from "./MasterPoliForm";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
export default function MasterPoli() {
  const [loading, setLoading] = useState(false);
const [openModal, setOpenModal] = useState(false);
const [editData, setEditData] = useState(null);
const [token] = useLocalStorageEncrypt("token", null);

const handleformSuobmit = async (form) => {
      console.log("data dari form poli:", form);
      if (form.id) {
      console.log("edit data poli", form);
      }else{
      const {data , status} = await Api1('/add-master-poli', 'POST', form, {
        Authorization: `Bearer ${token}`,
      });
      if(status === 200){
        console.log("sukses menambah poli", data);
        setOpenModal(false);
        // refresh data poli  
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
          width: '60%',
          position: 'relative',
        }}>
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
        <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ borderRadius: "12px", fontWeight: "bold" }}
                sixe="small"
                 onClick={() => {
                setEditData(null);
                setOpenModal(true);
              }}
                >
                    Tambah Poli
                </Button>
                    <TextField
                size="small"
                variant="outlined"
                label="Cari Poli"
             
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
                        <TableCell>Kode Poli</TableCell>
                        <TableCell>Nama</TableCell>
                        <TableCell>Deskripsi</TableCell>
                        <TableCell>Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {
                    loading?(
                      array.from(new Array(1)).map((_, index)=>(
                        <TableRow key={index}>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>

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
        </Paper>
        </Box>
  </Box>
<PopUpCostum
        open={openModal}
        handleClose={() => 
         { 
          setOpenModal(false)
          setEditData(null);
        }} 
        title="Form Poli"
      
      >
        <MasterPoliForm onSubmit={handleformSuobmit} initialData={editData}/>
        {/* Konten form dapat ditambahkan di sini */}
      </PopUpCostum>
  </>
  );
}
