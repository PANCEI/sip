import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
  Skeleton,
  CircularProgress,
  Table,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Api1 } from "../../../utils/Api1";
import EditIcon from '@mui/icons-material/Edit';
import PopUpCostum from "../../../components/PopUpCostum";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { useEffect } from "react";
import SubMenuForm from "./SubMenuForm";
import { Toast } from "../../../components/Toast";

export default function SubMenu() {
  const [buka , setBuka] = useState(false);
const [simpan , setSimpan] = useState();
const [loadingData , setLoadingData] = useState(false);
const [token] = useLocalStorageEncrypt('token',null)
const [dataSubMenu , setDataSubMenu] = useState([]);
const [cariData, setCariData] = useState('');
const [halaman , setHalaman] = useState('');
const [editdata , setEditData] = useState(null)
const [barisHalaman , setBarisHalaman] = useState(5);
const [masterMenu , setMasterMenu] = useState([]);
 const showToast = Toast();
const getDataSubMenu = async ()=>{
 setLoadingData(true)
  try{
    const {data , status} = await Api1(
      "/submenu",
      "GET",
      {},{
          Authorization: `Bearer ${token}`,
      }
    );
    if(status === 200){
      setDataSubMenu(data.data); 
    }
  }catch(error){
    console.log("Gagal Mendapatkan Data Sub Menu");
    console.log(error);
  }finally{
    console.log("get data sub menu selesai");
    setLoadingData(false);
  }
}
const getMasterMenu= async ()=>{
  try{
  const { data, status } = await Api1(
         "/menu/all",
         "GET",
         {},
         {
           Authorization: `Bearer ${token}`,
         }
       );
       if(status === 200 ){
      setMasterMenu(data.data)
       }
  }catch(error){
    console.log(error);
     showToast('error', 'Gagal Get Data Master Menu!');
  }
}
useEffect(()=>{
getDataSubMenu();
getMasterMenu();
},[token]);
// untuk tablenya 
const filterSubmenus = dataSubMenu.filter((sub)=>
  sub.nama_sub_menu.toLowerCase().includes(cariData.toLowerCase())
);

const paginationSubMenu = filterSubmenus.slice(
  halaman * barisHalaman,
  halaman * barisHalaman + barisHalaman
)

const handlePerubahanHalaman = (event  , newHalaman) =>{
  setHalaman(newHalaman);
}
const handlePerubahanBarisHalaman = (event) =>{
  setBarisHalaman(parseInt(event.target.value, 10));
  setHalaman(0);
}
// pencarian table
const handlePencarian= (e)=>{
  setCariData(e.target.value)
  setHalaman(0)
}
// handle close modal
const handleTutupModal = ()=>{
setBuka(false);
setEditData(null)
}

const bukaModal = ()=>setBuka(true);
// handle form submit 
const handleFormSimpan = async(formData)=>{

}

  return (
    <>
    <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "80vh", zIndex: 1 }}>
    <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Sub Menu
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
          width:'100%',
          position:'realtive',
        }}>
          { simpan && (
             <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              p: 2,
              borderRadius: '12px',
            }}>
              <CircularProgress />
              <Typography variant="h6" color="text.secondary" mt={2}>
                Menyimpan...
              </Typography>
            </Box>
          )}
          <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} >
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
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  mb: { xs: 2, sm: 0 }
                }}
                onClick={()=>{
                  setEditData(null);
                  bukaModal();
                }}
            >
              Tambah Sub Menu
            </Button>
            <TextField
            label="Cari Sub Menu"
              variant="outlined"
              size="small"
              onChange={handlePencarian}
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
                  width: { xs: '100%', sm: 'auto' },
                  mt: { xs: 2, sm: 0 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
            />
            </Box>
            <TableContainer>
                <Table aria-label="sub menu table">
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "primary.dark", color: "white" } }}>
                    <TableCell>Nama Sub Menu</TableCell>
                    <TableCell>Url</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell>Master Menu</TableCell>
                    <TableCell>icon</TableCell>
                    <TableCell>Sub</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { loadingData ? (
                  Array.from(new Array(1)).map((_, index) => (
                    <TableRow key={index}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                  ))
                ) : paginationSubMenu.length > 0 ?(
               
                  <>
                    
                      {paginationSubMenu.map((sub, index) => (
                        <TableRow
                          key={sub.id}
                          sx={{
                            "&:hover": { bgcolor: "action.hover" },
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell size="small" component="th" scope="row">
                            {sub.nama_sub_menu}
                          </TableCell>
                          <TableCell size="small" component="th" scope="row">
                            {sub.url}
                          </TableCell>
                          <TableCell size="small" component="th" scope="row">
                            {sub.path}
                          </TableCell>
                          <TableCell size="small" component="th" scope="row">
                            {sub.menu_nama}
                          </TableCell>
                          <TableCell size="small" component="th" scope="row">
                            {sub.icon}
                          </TableCell>
                          <TableCell size="small" component="th" scope="row">
                            {sub.sub? "Yes" : ""}
                          </TableCell>
                          <TableCell>
                            <Tooltip
                            color="primary"
                            aria-label="edit sub menu"
                            >
                              <IconButton>
                              <EditIcon></EditIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                            color="error"
                            aria-label="hapus sub menu"
                            >
                              <IconButton>
                              <DeleteIcon></DeleteIcon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </>
                
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        Tidak ada data yang ditemukan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                </TableBody>
                </Table>
            </TableContainer>
             <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={filterSubmenus.length}
                          rowsPerPage={barisHalaman}
                          page={halaman}
                          onPageChange={handlePerubahanHalaman}
                          onRowsPerPageChange={handlePerubahanBarisHalaman}
                          sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
                        />
          </Paper>
        </Box>
    </Box>
    <PopUpCostum
    open={buka}
    handleClose={handleTutupModal}
    title={editdata ? "Edit Sub Mmeu" : "Tambah Sub Menu"}
    >
      <SubMenuForm onSubmit={handleFormSimpan} initialData={editdata} masterMenu={masterMenu}/>
    </PopUpCostum>    
    </>
  );
}
