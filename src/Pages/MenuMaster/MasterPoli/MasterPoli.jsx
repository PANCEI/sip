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
  TablePagination, 
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import { useState , useEffect , useMemo} from "react";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterPoliForm from "./MasterPoliForm";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
import EditIcon from '@mui/icons-material/Edit';

export default function MasterPoli() {
  const [loading, setLoading] = useState(false);
const [openModal, setOpenModal] = useState(false);
const [editData, setEditData] = useState(null);
const [token] = useLocalStorageEncrypt("token", null);
const[pencarian , setPencarian] = useState('');
const [dataPoli, setDataPoli] = useState([]);
const fetchDataPoli = async () => {
  setLoading(true);
try{
  const {data , status} = await Api1('/all-master-poli', 'GET', {}, {
    Authorization: `Bearer ${token}`,
  });
  if(status === 200){
    console.log("data poli:", data);
    setDataPoli(data.data);
  }
}catch(error){
  console.log("error fetch data poli", error);
}finally{
  setLoading(false);
}
};
useEffect(() => {
  fetchDataPoli();
}, []);
const handleformSuobmit = async (form) => {
      console.log("data dari form poli:", form);
              setOpenModal(false);
      if (form.id) {
      console.log("edit data poli", form);
      const {data , status} = await Api1('/edit-master-poli' , 'PUT', form,{  Authorization: `Bearer ${token}`,
      });
      if(status === 200){
        console.log(data);
        fetchDataPoli();
      }
      }else{
      const {data , status} = await Api1('/add-master-poli', 'POST', form, {
        Authorization: `Bearer ${token}`,
      });
      if(status === 200){
        console.log("sukses menambah poli", data);
        fetchDataPoli();
        // refresh data poli  
      }
    }
}
// Filter data berdasarkan input pencarian
  const filteredData = useMemo(() => {
    return dataPoli.filter((item) => {
      const searchLower = pencarian.toLowerCase();
      return (
        item.nama_poli?.toLowerCase().includes(searchLower) ||
        item.kode_poli?.toLowerCase().includes(searchLower) ||
        item.deskripsi?.toLowerCase().includes(searchLower)
      );
    });
  }, [pencarian, dataPoli]);
  const ubahStatus = async (item)=>{
    console.log('ubah status', item);
    try{
      const statusBaru = item.is_active === 1 ? 0:1;
const {data , status} = await Api1('/ubah-active-poli','PUT',{
  id:item.id,
  is_active:statusBaru
}, {Authorization: `Bearer ${token}`})
  if(status === 200  && data.message === 'berhasil'){
    console.log('ubah status berhasil', data.message);
  }
    }catch(error){
      console.log('data melakukan update active', error);
    }finally{

    }
  }
  return (
  <>
 <Box sx={{p:3 , bgcolor:"grey.100", minHeight:"70vh" , zIndex:1}}>
<Card sx={{mb:3, borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.05)"}}>
         <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Poli
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
             value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
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
                        <TableCell>active</TableCell>
                        <TableCell>Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {
                    loading?(
                      Array.from({ length: 1 }).map((_, i) => (
                        <TableRow key={i}>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>
                           <TableCell><Skeleton variant="text" /></TableCell>

                        </TableRow>
                      ))
                    ):filteredData.length > 0 ? (
                      filteredData.map((item , index) => (
                        <TableRow key={index}>
                          <TableCell>{item.kode_poli}</TableCell>
                          <TableCell>{item.nama_poli}</TableCell>
                          <TableCell>{item.deskripsi}</TableCell>
                          <TableCell>
                            <Tooltip
                              title={
                            item.is_active === 1
                              ? "Klik untuk mengaktifkan"
                              : "Klik untuk menonaktifkan"
                          }
                            >
                               <Switch
                            checked={item.is_active === 0}
                           onChange={()=> {
                            ubahStatus(item)
                           }}
                            color={item.is_active === 1 ? "error" : "success"}
                          />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                              <Tooltip
                        color="primary"
                        aria-label="Edit Master Poli"
                       onClick={()=>{
                        setEditData(item);
                        setOpenModal(true);
                       }}
                        >
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                        </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ): (
                      <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
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
        title={setEditData ? "Edit Master Poli" :"Tambah Master Poli"}
      
      >
        <MasterPoliForm onSubmit={handleformSuobmit} initialData={editData}/>
        {/* Konten form dapat ditambahkan di sini */}
      </PopUpCostum>
  </>
  );
}
