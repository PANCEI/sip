import { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, TextField, InputAdornment,
  Button, Stack, CircularProgress, Typography, Paper,Tooltip,IconButton,Switch
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import PopUpCostum from "../../components/PopUpCostum";
import EditIcon from '@mui/icons-material/Edit';
export default function TablePasien({ data, totalData, onRefresh, refreshLoading }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open , setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  // Logika Debounce: Menunggu user berhenti mengetik selama 500ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Pastikan onRefresh dikirim dari parent (MasterPasien)
      if (onRefresh) {
        onRefresh(page + 1, rowsPerPage, search);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
const handleSubmit = async (form)=>{
  console.log(form);
}
const handleToggleStatus= async (form)=>{
  console,log(form)
}
  return (
    <Paper elevation={3} sx={{ width: '100%', borderRadius: 3, overflow: 'hidden' }}>
      {/* TOOLBAR: SEARCH & REFRESH */}
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        spacing={2} 
        sx={{ p: 3, bgcolor: "#fff" }} 
        justifyContent="space-between" 
        alignItems="center"
      >
        <TextField
          label="Cari Pasien"
          placeholder="Cari Nama atau No. RM..."
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // Reset ke hal 1 saat mencari
          }}
          sx={{ width: { xs: "100%", sm: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        
        <Button 
          variant="contained" 
          disableElevation
          onClick={() => onRefresh(page + 1, rowsPerPage, search)} 
          disabled={refreshLoading}
          startIcon={refreshLoading ? <CircularProgress size={20} color="inherit" /> : <Refresh />}
        >
          {refreshLoading ? "Memuat..." : "Refresh"}
        </Button>
      </Stack>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {/* Styling Header agar lebih menonjol */}
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>No. RM</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>Nama Pasien</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>Alamat</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>Tanggal Lahir</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>Deskripsi</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }} align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refreshLoading ? (
              // Tampilan saat sedang loading
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <CircularProgress size={40} />
                  <Typography sx={{ mt: 2 }} color="text.secondary">Mengambil data database...</Typography>
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              // Tampilan saat data ada
              data.map((row, index) => (
                <TableRow key={row.id || index} hover>
                  <TableCell sx={{ fontWeight: "600", color: "primary.dark" }}>{row.no_rm}</TableCell>
                  <TableCell>{row.nama_pasien}</TableCell>
                  <TableCell>{row.alamat || "-"}</TableCell>
                  <TableCell>{row.tanggal_lahir || "-"}</TableCell>
                  <TableCell>{row.deskripsi || "-"}</TableCell>
                    <TableCell>
                            <Tooltip
                              title={
                                row.flag_delete === 1
                                  ? "Klik untuk mengaktifkan"
                                  : "Klik untuk menonaktifkan"
                              }
                            >
                              <Switch
                                checked={row.flag_delete === 0}
                                onChange={() => handleToggleStatus(row)}
                                color={row.flag_delete === 1 ? "error" : "success"}
                              />
                            </Tooltip>
                            {row.flag_delete === 1 ? "Nonaktif" : "Aktif"}
                          </TableCell>
                  <TableCell align="center">
                        <Tooltip
                              color="primary"
                              aria-label="Edit Master Obat"
                              onClick={() => {
                                setEditData(row);
                                setOpen(true);
                              }
                                
                              }
                            >
                              <IconButton>
                                <EditIcon></EditIcon>
                              </IconButton>
                            </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Tampilan saat data kosong
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada data pasien ditemukan.
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
        count={totalData || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris:"
      />
     <PopUpCostum
     open={open}
     handleClose={()=>{
      setOpen(false)
      setEditData(null)
     }}
     title="Edit Master Pasien"
     
     >

     </PopUpCostum>
    </Paper>

  );
}