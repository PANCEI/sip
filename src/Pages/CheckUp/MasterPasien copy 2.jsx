import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Paper, Alert, Snackbar } from "@mui/material";
import FormPasien from "./FormPasien";
import TablePasien from "./TablePasien";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function MasterPasien() {
  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [listPasien, setListPasien] = useState([]);
  const [totalData, setTotalData] = useState(2);
  const [token] = useLocalStorageEncrypt('token', null);

  // State untuk notifikasi (Snackbar)
  const [noti, setNoti] = useState({ open: false, msg: "", type: "success" });

  // Menggunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const loadData = useCallback(async (page = 1, limit = 5, keyword = "") => {
    if (!token) return;
    setRefreshLoading(true);
    try {
      // Mengirim page, limit, dan search ke Backend
      const endpoint = `/all-master-pasien?page=${page}&limit=${limit}&search=${keyword}`;
      const { data, status } = await Api1(endpoint, 'GET', {}, {
        Authorization: `Bearer ${token}`
      });

      if (status === 200 && data.message === 'berhasil') {
        setListPasien(data.data); 
        setTotalData(data.total); // Menyimpan total row dari DB untuk pagination
        console.log('totoal data ',data.total);
        console.log('totoal data ',data.data);
      }
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setRefreshLoading(false);
    }
  }, [token]);

  // Load data pertama kali
  useEffect(() => {
    loadData(1, 5, "");
  }, [loadData]);

  const handleSimpan = async (form) => {
    setLoading(true);
    try {
      const { data, status } = await Api1('/add-master-pasien', 'POST', form, {
        Authorization: `Bearer ${token}`
      });

      if (status === 200 || status === 201) {
        setNoti({ open: true, msg: "Data pasien berhasil disimpan!", type: "success" });
        // Refresh data ke halaman 1 dengan limit 5 setelah simpan berhasil
        loadData(1, 5, "");
      } else {
        setNoti({ open: true, msg: data.message || "Gagal menyimpan data", type: "error" });
      }
    } catch (error) {
      console.error('Error saat simpan:', error);
      setNoti({ open: true, msg: "Terjadi kesalahan koneksi", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", lg: "row" }, 
          gap: 3, 
          alignItems: "flex-start" 
        }}
      >
        {/* SISI KIRI: Form */}
        <Box sx={{ flex: { xs: "1 1 100%", lg: "0 0 380px" }, width: "100%" }}>
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fff' }}>
              <Typography variant="h6" fontWeight="700" color="primary">
                Input Data Pasien
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <FormPasien onSubmit={handleSimpan} loading={loading} />
            </Box>
          </Paper>
        </Box>

        {/* SISI KANAN: Tabel */}
        <Box sx={{ flex: "1 1 auto", width: "100%", minWidth: 0 }}>
          <TablePasien 
            data={listPasien} 
            totalData={totalData}
            onRefresh={loadData} 
            refreshLoading={refreshLoading} 
          />
        </Box>
      </Box>

      {/* Snackbar untuk Feedback User */}
      <Snackbar 
        open={noti.open} 
        autoHideDuration={4000} 
        onClose={() => setNoti({ ...noti, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={noti.type} variant="filled" sx={{ width: '100%' }}>
          {noti.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}