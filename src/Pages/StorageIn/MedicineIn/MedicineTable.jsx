import { Box, Table, TableBody, TableRow , TableHead, TablePagination, Paper,TextField , TableContainer, TableCell,Skeleton} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
export default function MadicineTable(){
const [token] = useLocalStorageEncrypt('token', null);
const GetdataMedicineIn = async ()=>{
    try{
const {data , status} = await Api1('/all-medicine-in', "GET", {}, { Authorization: `Bearer ${token}` });
if(status === 200){
    console.log("Medicine In Data:", data);
}
    }catch(error){
        console.log("Error fetching medicine in data:", error);
    }
}
const [loadingData , setLoadingData] = useState(false);

return(
    <>
    <Box sx={{position:'relative'}}>
    <Paper  sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 2 }}>
        <Box
          sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid",
              borderColor: "grey.300",
              bgcolor: "grey.50",
              flexDirection: { xs: "column", sm: "row" },
            }}
        >
            
                        <TextField
                          label="Cari Obat Masuk"
                          variant="outlined"
                          size="small"
                          value={''}
                        
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
                      bgcolor: "success.main",
                      color: "white",
                    },
                  }}
                >
                    <TableCell>Kode Obat</TableCell>
                    <TableCell>Nama Obat</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Jumlah Masuk</TableCell>
                    <TableCell>Tanggal Masuk</TableCell>
                    <TableCell>Tanggal Masuk</TableCell>
                    <TableCell>Petugas</TableCell>
                    <TableCell>Keterangan</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {loadingData ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                            <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                        </TableRow>
                    ))
                ) : (
                    // Render actual data here
                     <TableRow>
                                        <TableCell colSpan={8} align="center">
                                          Tidak ada data
                                        </TableCell>
                                      </TableRow>
                )}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
    </Box>
    </>
)
}