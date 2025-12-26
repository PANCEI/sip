import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, TablePagination, TextField, InputAdornment, 
  Button, Stack, Tooltip, CircularProgress, Typography, Paper
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";

export default function TablePasien({ data, onRefresh, refreshLoading }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Logika Filter Data
  const filteredData = data.filter((p) =>
    p.nama_pasien.toLowerCase().includes(search.toLowerCase()) ||
    p.no_rm.toLowerCase().includes(search.toLowerCase())
  );

  // Logika Pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', borderRadius: 3, overflow: 'hidden' }}>
      {/* Toolbar: Search & Refresh */}
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        spacing={2} 
        sx={{ p: 3, bgcolor: "#fff" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
         label="Cari Pasien"
         variant="outlined"
            size="small"
          placeholder="Cari Nama atau No. RM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
  sx={{ width: { xs: "100%", sm: "300px" }, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        
        <Button 
          variant="outlined" 
          startIcon={refreshLoading ? <CircularProgress size={20} /> : <Refresh />}
          onClick={onRefresh}
          disabled={refreshLoading}
        >
          Refresh Data
        </Button>
      </Stack>

      {/* Table Content */}
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
           <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "success.main", color: "white" } }}>
              <TableCell sx={{ fontWeight: "bold" }}>No. RM</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Pasien</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NIK</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telepon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Alamat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: "600", color: "primary.main" }}>{row.no_rm}</TableCell>
                  <TableCell>{row.nama_pasien}</TableCell>
                  <TableCell>{row.nik}</TableCell>
                  <TableCell>{row.telepon}</TableCell>
                  <TableCell>{row.alamat}</TableCell>
                </TableRow>
              ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">Data tidak ditemukan</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris:"
      />
    </Paper>
  );
}