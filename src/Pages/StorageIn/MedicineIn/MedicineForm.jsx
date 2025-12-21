import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { 
  FormControl, TextField, Box, Select, MenuItem, 
  InputLabel, Button, Divider, InputAdornment, FormHelperText, Typography, Paper, CircularProgress
} from "@mui/material";
import { 
  Save, Numbers, CalendarToday, 
  Store, Description, Fingerprint, Close 
} from "@mui/icons-material";
import { Api1 } from "../../../utils/Api1";

export default function MedicineForm({ onSubmit }) {
  const [user] = useLocalStorageEncrypt("user", null);
  const [token] = useLocalStorageEncrypt("token", null);
  const [loading, setLoading] = useState(false);
  const [kodeObatList, setKodeObatList] = useState([]);
  const [kodeMitraList, setKodeMitraList] = useState([]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      kode_obat: "", jumlah_masuk: "",
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
    try {
      const { data, status } = await Api1('/kode-obat', "GET", {}, { Authorization: `Bearer ${token}` });
      if (status === 200) {
        setKodeObatList(data.data);
      }
    } catch (error) {
      console.error("Error fetching kode obat:", error);
    } finally {
      setLoading(false);
    }
  };

  const getKodeMitra = async () => {
    try {
      const { data, status } = await Api1('/kode-mitra', "GET", {}, { Authorization: `Bearer ${token}` });
      if (status === 200) {
        setKodeMitraList(data.data);
      }
    } catch (error) {
      console.error("Error fetching kode mitra:", error);
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
   reset();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper elevation={2} sx={{ width: "100%", p: 5, borderRadius: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
            Tambah Stok Obat
          </Typography>
          <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
            Pastikan data yang dimasukkan sesuai dengan dokumen pengiriman.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            
            {/* KODE OBAT */}
            <FormControl fullWidth error={!!errors.kode_obat}>
              <InputLabel>Kode Obat</InputLabel>
              <Controller
                name="kode_obat"
                control={control}
                rules={{ required: "Pilih Kode Obat" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Kode Obat"
                    startAdornment={<InputAdornment position="start"><Fingerprint color="primary" /></InputAdornment>}
                  >
                    {kodeObatList.map((item) => (
                      <MenuItem key={item.kode_obat} value={item.kode_obat}>
                        {item.kode_obat} - {item.nama_obat}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.kode_obat?.message}</FormHelperText>
            </FormControl>

            {/* MITRA */}
            <FormControl fullWidth error={!!errors.kode_mitra}>
              <InputLabel>Mitra</InputLabel>
              <Controller
                name="kode_mitra"
                control={control}
                rules={{ required: "Harap Pilih Mitra" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Mitra"
                    startAdornment={<InputAdornment position="start"><Store color="primary" /></InputAdornment>}
                  >
                    {kodeMitraList.map((item) => (
                      <MenuItem key={item.kode_mitra} value={item.kode_mitra}>
                        {item.kode_mitra} - {item.nama_mitra}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.kode_mitra?.message}</FormHelperText>
            </FormControl>

            {/* JUMLAH */}
            <Box sx={{ flex: "1 1 120px" }}>
              <Controller
                name="jumlah_masuk"
                control={control}
                rules={{ required: "Jumlah harus diisi" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Jumlah"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start"><Numbers color="primary" /></InputAdornment>,
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
            
            {/* TANGGAL MASUK */}
            <Box sx={{ flex: "1 1 200px" }}>
              <Controller
                name="tanggal_masuk"
                control={control}
                rules={{ required: "Tanggal masuk harus di isi" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Tanggal Masuk"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        startAdornment: <InputAdornment position="start"><CalendarToday color="primary" /></InputAdornment>,
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* TANGGAL KADALUARSA */}
            <Box sx={{ flex: "1 1 200px" }}>
              <Controller
                name="tanggal_kadaluarsa"
                control={control}
                rules={{ required: "Tanggal kadaluarsa harus di isi" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Kadaluarsa"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        startAdornment: <InputAdornment position="start"><CalendarToday color="error" /></InputAdornment>,
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* KETERANGAN */}
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
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start"><Description color="primary" /></InputAdornment>,
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

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