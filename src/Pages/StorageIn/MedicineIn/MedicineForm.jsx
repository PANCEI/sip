import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { 
  FormControl, TextField, Box, Select, MenuItem, 
  InputLabel, Button, Divider, InputAdornment, FormHelperText, Typography, Paper ,CircularProgress
} from "@mui/material";
import { 
  Save, Medication, Numbers, CalendarToday, 
  Store, Description, Fingerprint, Close 
} from "@mui/icons-material";
import { Api1 } from "../../../utils/Api1";
export default function MedicineForm({ onSubmit }) {
  const [user] = useLocalStorageEncrypt("user", null);
  const [token]=useLocalStorageEncrypt("token", null);
  const [loading, setLoading] = useState(false);
  const [kodeObatList, setKodeObatList] = useState([ ]);
  
  const [kodeMitraList, setKodeMitraList] = useState([]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      kode_obat: "",  jumlah_masuk: "",
      tanggal_masuk: "", tanggal_kadaluarsa: "",
      keterangan: "", kode_mitra: "",
      penerima: user ? user.email : "",
    }
  });
  useEffect(() => {
    fetchKodeObat();
    getKodeMitra();
  }, [user]);
const fetchKodeObat = async () => {
    setLoading(true);
try{
  const {data, status} = await Api1('/kode-obat', "GET", {}, { Authorization: `Bearer ${token}` });
    if(status === 200){
    console.log("Fetched Kode Obat:", data);
    setKodeObatList(data.data);
    setLoading(false);

    }  
}catch(error){
    console.error("Error fetching kode obat:", error);
}
};
const getKodeMitra = async () => {
    setLoading(true);
    // Fungsi ini bisa diisi jika ingin mengambil data mitra dari API
    try{
    const {data, status} = await Api1('/kode-mitra', "GET", {}, { Authorization: `Bearer ${token}` });
    if(status === 200){
        console.log("Fetched Kode Mitra:", data);
        setKodeMitraList(data.data);
        setLoading(false);
        // setKodeMitraList(data.data); // Jika ingin menyimpan ke state
    }
    }catch(error){
        console.error("Error fetching kode mitra:", error);
    }
  }
   if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      );
    }
    // ini agar bisa reset form setelah submit
    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset(); // Reset form setelah submit
    };
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

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          
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
                      {kodeObatList.map((item,i) => (
                        <MenuItem key={item.i} value={item.kode_obat}>{item.kode_obat} - {item.nama_obat}</MenuItem>
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
                      {kodeMitraList.map((item,i) => (
                        <MenuItem key={item.i} value={item.kode_mitra}>{item.kode_mitra}-{item.nama_mitra}</MenuItem>
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