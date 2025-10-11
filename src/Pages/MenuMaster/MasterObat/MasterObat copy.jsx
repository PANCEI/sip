import { Card, CardContent, Typography ,Box , Paper, Button , TextField, TableContainer, Table, TableRow, TableHead , TableCell, TableBody, Skeleton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import PopUpCostum from "../../../components/PopUpCostum";
//import MasterObatForm from "./MasterObarForm";
export default function MasterObat() {
  // state untuk master obat 
 const [MasterObat, setMasterObat] = useState([]);
//  state unutuk pencarian
const [pencarian , setPencarian ] = useState([]);
 const [token] = useLocalStorageEncrypt("token", null);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const filterMasterObat = MasterObat.filter((master)=>
master.nama_obat.toLowerCase().includes(pencarian.toLowerCase())
)
const pageMasterObat = filterMasterObat.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
)
// api untuk get data master obat all
const fetchMasterObat= async ()=>{
  try{
    const {data , status} = await Api1(
      "/all-obat",
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
        
      }

    );
    
    setMasterObat(data.data);
  }catch(error){
    console.log(error)
  }finally{

  }

}
  useEffect(() => {
    fetchMasterObat();
  }, [token]);

// state untuk loading table
const [loadingData , setLoadingData] = useState(false);
const [editData, setEditData] = useState(null);
const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditData(null); // Clear edit data when closing
  };
  const handleFormSubmit = async (formData)=>{
    handleClose();
    // console.log(formData);
    //     try{
    //       const {data , status} = Api1('/add-master-obat',"POST", formData,{
    //         Authorization:`Bearer ${token}`
    //       })
    //       console.log(data);
    //     }catch(error){

    //     }finally{
          
    //     }
  }
  return (
        <>
        <Box sx={{p:2,bgcolor:"grey.100", minHeight:"100vh", zIndex:1}} >
        {/* box hampir mirip ama container */}
        <Card sx={{mb:3, borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.05)"}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                Master Obat
                </Typography>
            </CardContent>
        

        </Card>
        {/* content  */}
        <Box
        sx={{
            width:"50%",
            position:"relative"
        }}
        >
        <Paper sx={{borderRadius:"12px", overflow:"hidden" , boxShadow: "0 4px 12px rgba(0,0,0,0.05)"}} >
        {/* box untuk atas table */}
        <Box
        sx={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            p:2,
            borderBottom:"1px solid",
            borderColor:"grey.300",
            bgcolor:"grey.50",
            flexDirection:{xs:"column", sm:"row"}
        }}
        >
            {/* tombol tambah */}
             <Button 
          variant="contained"
          color="primary"
        startIcon={<AddIcon/>}
        sx={{
            borderRadius:"12px",
            textTransform:"none",
            fontWeight:"bold",
            mb:{xs:2, sm:0}  
        }} 
        onClick={()=>{
          setEditData(null)
          handleOpen();
        }}  
          >
            Tambah Obat
          </Button>
          {/* /akhir tombol tambah */}
          {/* awal tombol pencarian */}
          <TextField
          label="Cari Master Obat"
          variant="outlined"
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
          {/* akhir tombol pencarian */}
        </Box>
        {/* table  */}
        <TableContainer >
        <Table aria-label="menu master obat">
        <TableHead>
            <TableRow
            sx={{
                "& th": { fontWeight: "bold", bgcolor: "success.main", color: "white" } 
            }}
            >
             <TableCell> Kode Obat </TableCell>   
             <TableCell> Nama Obat </TableCell>   
             <TableCell> Status </TableCell>   
             <TableCell> Aksi </TableCell>   
            </TableRow>
        </TableHead>
            {/* isi table */}
            {/* cek apakah semnetara melakukan penarikan data atau tidak */}
            <TableBody>

            {loadingData?(
              Array.from(new Array(1)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton variant="text" /></TableCell>
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
        {/* akhir content */}
        </Box>
        {/* awal modal */}
          <PopUpCostum
         open={open}
        handleClose={handleClose}
        title={editData ? "Edit Master Obat" : "Tambah Master Obat"}
          >
            
          </PopUpCostum>
        </>
  );
}
