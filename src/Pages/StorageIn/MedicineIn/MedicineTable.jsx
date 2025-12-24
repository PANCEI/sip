import { 
  Box, Table, TableBody, TableRow, TableHead, TablePagination, 
  Paper, TextField, TableContainer, TableCell, Skeleton,
  IconButton, Tooltip 
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete"; 
import InputAdornment from '@mui/material/InputAdornment';
import { alertConfirmation } from "../../../components/alertConfirmation";
import { Toast } from "../../../components/Toast";
export default function MadicineTable() {
  const [token] = useLocalStorageEncrypt('token', null);
  const {confirm} = alertConfirmation();
  const [medicines, setMedicines] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const ToastShow = Toast();
  const GetdataMedicineIn = useCallback(async () => {
    setLoadingData(true);
    try {
      const url = `/all-medicine-in?page=${page + 1}&per_page=${rowsPerPage}&search=${searchTerm}`;
      const { data, status } = await Api1(url, "GET", {}, { 
        Authorization: `Bearer ${token}` 
      });

      if (status === 200) {
        setMedicines(data.data.data || []); 
        setTotalData(data.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  }, [token, page, rowsPerPage, searchTerm]);

  // Fungsi Hapus (Silahkan pasang hook custom Anda di sini)
const handleDelete = async (form) => {
  const confirmDelete = await confirm({
    text: "Yakin? Anda Akan Mengurangi Stok Obat Ini",
  });

  if (confirmDelete) {
    try {
      // Panggil API
      const result = await Api1(`/delete-medicine-in`, "DELETE", form, {
        Authorization: `Bearer ${token}`,
      });

      // Karena helper Api1 melakukan 'return' saat error, 
      // kita cek statusnya secara manual di sini, bukan di catch.
      
      if (result.status === 200) {
        ToastShow("success", result.data?.message || "Berhasil menghapus data");
        GetdataMedicineIn();
      } else {
        // DI SINI tempat menangkap status 422, 404, dll.
        // Helper Anda menaruh JSON Laravel di dalam properti 'error'
        const serverMsg = result.error?.message || result.error?.data || "Gagal menghapus data";
        
        console.error("Gagal dari Server:", result);
        ToastShow("error", serverMsg);
      }
    } catch (err) {
      // Catch ini hanya akan jalan jika ada error fatal di level JS (misal typo kode)
      console.error("Fatal Error:", err);
      ToastShow("error", "Terjadi kesalahan sistem");
    }
  }
};

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      GetdataMedicineIn();
    }, 500); 
    return () => clearTimeout(delayDebounceFn);
  }, [GetdataMedicineIn]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 2 }}>
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            p: 2, 
            bgcolor: "grey.50" 
          }}
        >
          <Tooltip title="Muat Ulang Data">
            <IconButton 
              onClick={GetdataMedicineIn} 
              disabled={loadingData}
              color="primary"
              sx={{ bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
            >
              <RefreshIcon sx={{ animation: loadingData ? "spin 1s linear infinite" : "none" }} />
            </IconButton>
          </Tooltip>

          <TextField
            label="Cari Obat / Kode"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", sm: "300px" }, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "success.main", color: "white" } }}>
                <TableCell>Kode Obat</TableCell>
                <TableCell>Nama Obat</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Jumlah</TableCell>
                <TableCell>Tanggal Masuk</TableCell>
                <TableCell>Kadaluarsa</TableCell>
                <TableCell>Petugas</TableCell>
                <TableCell>Keterangan</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingData ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <TableCell key={i}><Skeleton variant="text" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : medicines.length > 0 ? (
                medicines.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.kode_obat}</TableCell>
                    <TableCell>{row.nama_obat}</TableCell>
                    <TableCell>{row.nama_mitra}</TableCell>
                    <TableCell>{row.jumlah_masuk}</TableCell>
                    <TableCell>
          {row.tanggal_masuk 
            ? new Date(row.tanggal_masuk).toLocaleDateString('id-ID').replace(/\//g, '-') 
            : '-'}
        </TableCell>
                    <TableCell>
          {row.tanggal_kadaluarsa 
            ? new Date(row.tanggal_kadaluarsa).toLocaleDateString('id-ID').replace(/\//g, '-') 
            : '-'}
        </TableCell>
                    <TableCell>{row.petugas}</TableCell>
                    <TableCell>{row.keterangan}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="error" 
                        size="small"
                        onClick={() => handleDelete(row)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>Tidak ada data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalData}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Baris per halaman:"
        />
      </Paper>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}