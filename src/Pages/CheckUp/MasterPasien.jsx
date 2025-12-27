import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import FormPasien from "./FormPasien";
import TablePasien from "./TablePasien";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";
export default function MasterPasien() {
  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [listPasien, setListPasien] = useState([]);
  const [token] = useLocalStorageEncrypt('token',null);

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

  const handleSimpan = async (form) => {
   // setLoading(true);
    console.log(form);
    try{
      const {data, status} = await Api1('/add-master-pasien', 'POST', form,{
         Authorization: `Bearer ${token}` 
      })
      console.log('data', data);
    }catch(error){
      console.log('gagal  dari api', error);
    }
    // setTimeout(() => {
    //   setListPasien((prev) => [...prev, data]);
    //   setLoading(false);
    //   alert("Berhasil disimpan!");
    // }, 1000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* KONTINER UTAMA FLEXBOX
        flexDirection: "row" membuat elemen berjajar ke samping
        flexWrap: "wrap" membuat elemen otomatis turun jika layar terlalu sempit (HP)
      */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", lg: "row" }, 
          gap: 3, 
          alignItems: "flex-start" 
        }}
      >
        
        {/* SISI KIRI: Form (Lebar tetap/Fixed Width) */}
        <Box 
          sx={{ 
            flex: { xs: "1 1 100%", lg: "0 0 380px" }, // Kunci lebar di 380px pada layar besar
            width: "100%" 
          }}
        >
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

        {/* SISI KANAN: Tabel (Lebar Fleksibel/Grow) */}
        <Box 
          sx={{ 
            flex: "1 1 auto", // Mengambil sisa ruang yang ada
            width: "100%",
            minWidth: 0 // Mencegah konten tabel merusak layout flex
          }}
        >
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