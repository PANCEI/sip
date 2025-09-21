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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { useEffect } from "react";
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import { encryptData } from "../../../helper/DecodeSlug";
import { useNavigate } from "react-router";
import PopUpCostum from "../../../components/PopUpCostum";
import AksesForm from "./AksesForm";
import { Api } from "@mui/icons-material";
import { alertConfirmation } from "../../../components/alertConfirmation";

export default function Akses() {
  const navigate = useNavigate();
  const [simpan , setSimpan] = useState(false);
  const [ambilData , setAmbilData] = useState(false);
  const [dataAkses , setDataAkses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [token] = useLocalStorageEncrypt("token", null);
 const [searchQuery, setSearchQuery] = useState("");
   const [open, setOpen] = useState(false);// state untuk popup
   const [editData, setEditData] = useState(null); // state untuk data yang akan diedit
   const {confirm} = alertConfirmation()





// api untuk getdata
const getDataAkses = async()=>{
  setAmbilData(true);
  try{
    console.log("memanggil data akses");
    const {data, status  }= await Api1(
        "/akses",
        "GET",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
    );
    if(status === 200){
      setDataAkses(data.data);
      setAmbilData(false);
    }else{
      setAmbilData(false);
    }
    console.log("status datanya adalah :" , status);
    console.log('data aksesnya adalah :' , data);

  }catch(error){
    console.log(error);
    setAmbilData(false);
  }
}
useEffect(()=>{
  getDataAkses();
},[token])

 const handleClose = () => {
    setOpen(false);
    setEditData(null); // Clear edit data when closing
  };
   const handleOpen = () => setOpen(true);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // logik untuk pagination
  const filterAkses = dataAkses.filter((akses) =>
    akses.akses.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginationAkses = filterAkses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )
  const handleDelete = async (id) => {

    console.log("menghapus data dengan id :" , id);
    const confirm2=await confirm({
      text:"Yakin ? Anda Akan Delete Juga sub Menunya"  
    });
    console.log(confirm2);
    if(confirm2){
      try{

      }catch(error){
        console.log(error);
        getDataAkses();
      }
    }

  }
  const edit = (data) => {
    console.log("edit data :" , data);
    setEditData(data)
    handleOpen();
  }
  const handleDetail= (id) =>{
    console.log("detail data dengan id :" , id);
   const data = encryptData(id.toString());
    console.log("data yang sudah di encrypt adalah :" , data);
    navigate(`/akses/${data}`);
  }
  const HandleFormSubnit = async(data) =>{
    console.log("data dari form adalah :" , data);
    data.akses= encryptData(data.akses);
    // pastikan yang di encrypth itu sudah string
 console.log(encryptData(data.id.toString()));

    console.log("data dari form yang sudah di encrypt adalah :" , data);
    setSimpan(true);
    handleClose();
    try{
      if(data.id){
        data.id= encryptData(data.id.toString());
      console.log("data akhir sebelum edit", data);
      const{ data3 , status } = await Api1("/akses/change", "PUT", data,{
        Authorization:`Bearer ${token}`,
      });
      console.log(data3);
      console.log(status);

      }else{

        const{ data3 , status } = await Api1(
          "/akses/add",
          "POST",
          data,
          {
            Authorization: `Bearer ${token}`,
          }
        );
         console.log("status dari simpan adalah :" , status);
         console.log("data dari simpan adalah :" , data3);
       
      }
       setSimpan(false);
      }catch(error){
        console.log(error);
        setSimpan(false);
    } finally {
          setSimpan(false);
          getDataAkses();
         
        }
  }
  return (
      <>
    <Box sx={{p:3, bgcolor:"grey.1000", minHeight:"100vh", zIndex:1}}>
    <Card sx={{mb:3,borderRadius:"14px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)"}}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="text-primary">Master Akses</Typography>
      </CardContent>
    </Card>
    <Box sx={{
      width:"50%",
      position:"relative",
    }}>
      {simpan &&(
        <Box sx={{
          position:"absolute",
          top:0,
          left:0,
          width:"100%",
          height:"100%",
          bgcolor:"rgba(255,255,255,0.7)",
          zIndex:10,
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column",
          p:2,
          borderRadius:"14px",
        }}>
        <CircularProgress>
          <Typography variant="caption" sx={{mt:2}}>Menyimpan Data...</Typography>
        </CircularProgress>
        </Box>
      )}
      <Paper sx={{borderradius:"12px",overflow:"hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)"}}>
        <Box sx={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          p:2,
          borderBottom:"1px solid",
          borderColor:"grey.300",
          bgcolor:"grey.50",
          flexDirection:{xs:"column", sm:"row"},
        }}>
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
                  setEditData(null); // Clear edit data when adding new
                  handleOpen();
                }}
          >
            Tambah Akses
          </Button>
          <TextField
          label="Cari Akses"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{
                  width: { xs: '100%', sm: 'auto' },
                  mt: { xs: 2, sm: 0 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
          >

          </TextField>
        </Box>
        <TableContainer>
        <Table aria-label="menu Akses">
        <TableHead>
        <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "primary.light", color: "white" } }}>
            <TableCell>Nama Akses</TableCell>
            <TableCell align="center">Aksi</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {ambilData ? (
           Array.from(new Array(1)).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell><Skeleton variant="text" /></TableCell>
                                  <TableCell align="center"><Skeleton variant="rectangular" width={60} height={36} sx={{ margin: 'auto' }} /></TableCell>
                                </TableRow>
                                ))
        ): paginationAkses.length > 0 ? (
           paginationAkses.map((akses, index) => (
                      <TableRow
                        key={akses.id}
                        sx={{
                          "&:hover": { bgcolor: "action.hover" },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell size="small" component="th" scope="row">
                          {akses.akses}
                        </TableCell>
                        <TableCell align="center" size="small">
                          <Tooltip title="Tambah Akses">
                            <IconButton
                              onClick={() => handleDetail(akses.id)}
                              color="primary"
                              aria-label="Tambah Akses"
                            >
                              <FormatListBulletedAddIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => edit(akses)}
                              color="primary"
                              aria-label="edit menu"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton
                              onClick={() => handleDelete(akses.id)}
                              color="error"
                              aria-label="delete menu"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
        ) :(
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
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
      open={open}
        handleClose={handleClose}
        title={editData ? "Edit Akses" : "Tambah Akses"}
        >
      <AksesForm onSubmit={HandleFormSubnit} initialData={editData} />
     </PopUpCostum>
      </>
  );
}