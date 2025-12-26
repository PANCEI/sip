import { useState, useEffect } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import FormPasien from "./FormPasien";
import TablePasien from "./TablePasien"; // Impor komponen tabel

export default function MasterPasien() {
  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [listPasien, setListPasien] = useState([]);

  // Fungsi ambil data dari API/Server
  const loadData = () => {
    setRefreshLoading(true);
    setTimeout(() => {
      const dummy = [
        { no_rm: "RM-001", nama_pasien: "Budi Santoso", nik: "3201...", telepon: "0812...", alamat: "Jakarta" },
        { no_rm: "RM-002", nama_pasien: "Siti Aminah", nik: "3202...", telepon: "0813...", alamat: "Bandung" },
      ];
      setListPasien(dummy);
      setRefreshLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSimpan = (data) => {
    setLoading(true);
    setTimeout(() => {
      setListPasien((prev) => [...prev, data]);
      setLoading(false);
      alert("Berhasil disimpan!");
    }, 1000);
  };
return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Kontainer Flexbox yang membuat tampilan sejajar seperti di gambar Anda */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", lg: "row" }, 
          gap: 3, 
          alignItems: "flex-start" 
        }}
      >
        {/* SISI KIRI: Form Input */}
        <Box sx={{ flex: { xs: "1 1 100%", lg: "0 0 380px" }, width: "100%" }}>
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
             <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                <Typography variant="h6" fontWeight="700" color="primary">Input Data Pasien</Typography>
             </Box>
             <Box sx={{ p: 3 }}>
                <FormPasien onSubmit={handleSimpan} loading={loading} />
             </Box>
          </Paper>
        </Box>

        {/* SISI KANAN: Tabel Data */}
        <Box sx={{ flex: "1 1 auto", width: "100%", minWidth: 0 }}>
          <TablePasien 
            data={listPasien} 
            onRefresh={loadData} 
            refreshLoading={refreshLoading} 
          />
        </Box>
      </Box>
    </Box>
  );
}