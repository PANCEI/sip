import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { 
  FormControl, TextField, Box, Select, MenuItem, 
  InputLabel, Button, Divider, InputAdornment, FormHelperText, Typography, Paper 
} from "@mui/material";
import { 
  Save, Medication, Numbers, CalendarToday, 
  Store, Description, Fingerprint, Close 
} from "@mui/icons-material";

export default function MedicineForm({ onSubmit }) {
  const [user] = useLocalStorageEncrypt("user", null);
  
  const [kodeObatList] = useState([
    { id: 1, kode: "OBT001", nama: "Paracetamol" },
    { id: 2, kode: "OBT002", nama: "Amoxicillin" }
  ]);
  
  const [kodeMitraList] = useState([
    { id: 1, kode: "MTR001", nama: "Kimia Farma" },
    { id: 2, kode: "MTR002", nama: "Bio Farma" }
  ]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      kode_obat: "", nama_obat: "", jumlah_masuk: "",
      tanggal_masuk: "", tanggal_kadaluarsa: "",
      keterangan: "", kode_mitra: "",
      penerima: user ? user.email : "",
    }
  });

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center"}}>
      <Paper elevation={2} sx={{ width: "100%", p: 5, borderRadius: 1 }}>
        
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
            Tambah Stok Obat
          </Typography>
          <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
            Pastikan data yang dimasukkan sesuai dengan dokumen pengiriman.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* BARIS 1: INFORMASI UTAMA (FLEXBOX) */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            
            
              <FormControl fullWidth error={!!errors.kode_obat}>
                <InputLabel>Kode Obat</InputLabel>
                <Controller
                  name="kode_obat"
                  control={control}
                  rules={{ required: "Pilih Kode" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Kode Obat"
                      startAdornment={<InputAdornment position="start"><Fingerprint color="primary" /></InputAdornment>}
                    >
                      {kodeObatList.map((item) => (
                        <MenuItem key={item.id} value={item.kode}>{item.kode} - {item.nama}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            
          
              <FormControl fullWidth>
                <InputLabel>Mitra</InputLabel>
                <Controller
                  name="kode_mitra"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Mitra"
                      startAdornment={<InputAdornment position="start"><Store color="primary" /></InputAdornment>}
                    >
                      {kodeMitraList.map((item) => (
                        <MenuItem key={item.id} value={item.kode}>{item.nama}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
           


          

            <Box sx={{ flex: "1 1 120px" }}> {/* Jumlah */}
              <Controller
                name="jumlah_masuk"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Jumlah"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Numbers color="primary" /></InputAdornment>,
                    }}
                  />
                )}
              />
            </Box>

            
          </Box>

          {/* BARIS 2: TANGGAL & KETERANGAN (FLEXBOX) */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
            
            <Box sx={{ flex: "1 1 200px" }}>
              <Controller
                name="tanggal_masuk"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Tanggal Masuk"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><CalendarToday color="primary" /></InputAdornment>,
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              <Controller
                name="tanggal_kadaluarsa"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Kadaluarsa"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><CalendarToday color="error" /></InputAdornment>,
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: "2 1 400px" }}>
              <Controller
                name="keterangan"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Keterangan / Catatan"
                    placeholder="Contoh: Barang dalam kondisi baik..."
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Description color="primary" /></InputAdornment>,
                    }}
                  />
                )}
              />
            </Box>

          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Tombol Aksi */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={() => reset()} 
              startIcon={<Close />}
              sx={{ px: 4, textTransform: "none", fontWeight: 600 }}
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<Save />}
              sx={{ 
                px: 5, 
                textTransform: "none", 
                fontWeight: 600,
                bgcolor: "#2980b9",
                '&:hover': { bgcolor: "#3498db" } 
              }}
            >
              Simpan Data
            </Button>
          </Box>

        </form>
      </Paper>
    </Box>
  );
}