import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { 
  FormControl, TextField, Box, Select, MenuItem, 
  InputLabel, Grid, Button, Divider, InputAdornment, FormHelperText 
} from "@mui/material";
import { Save, Medication, Numbers, CalendarToday, Store, Description, Fingerprint } from "@mui/icons-material";

export default function MedicineForm({ onSubmit }) {
    const [token] = useLocalStorageEncrypt("token", null);  
    const [user] = useLocalStorageEncrypt("user", null);
    
    // Data dummy untuk pilihan (nanti diisi dari API)
    const [kode_obat, setKode_Obat] = useState([
        { id: 1, kode: "OBT001", nama: "Paracetamol" },
        { id: 2, kode: "OBT002", nama: "Amoxicillin" }
    ]);
    const [kode_mitra, setKode_mitra] = useState([
        { id: 1, kode: "MTR001", nama: "Kimia Farma" },
        { id: 2, kode: "MTR002", nama: "Bio Farma" }
    ]);

    const {
        control, handleSubmit, reset, formState:{errors}
    } = useForm({
        defaultValues:{
            kode_obat:"",
            nama_obat:"",
            jumlah_masuk:"",
            tanggal_masuk:"",
            tanggal_kadaluarsa:"",
            keterangan:"",
            kode_mitra:"",
            penerima: user ? user.email : "",
        }
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", maxWidth: "800px" }}>
                <Grid container spacing={3}>
                       <Grid item xs={12} sm={6}>

            <FormControl fullWidth>
          <Controller
            name="kode_obat"
            control={control}
            rules={{ required: "Kode Obat harus diisi" }}
            render={({ field }) => (
              <TextField
              {...field}
                label="Kode Obat"
                variant="outlined"
                fullWidth
                disabled
                error={!!errors.kode_obat}
                helperText={errors.kode_obat?.message || ""}
              />
            )}
            />
        </FormControl>
            </Grid>
                       <Grid item xs={12} sm={6}>

            <FormControl fullWidth>
          <Controller
            name="kode_obat"
            control={control}
            rules={{ required: "Kode Obat harus diisi" }}
            render={({ field }) => (
              <TextField
              {...field}
                label="Kode Obat"
                variant="outlined"
                fullWidth
                disabled
                error={!!errors.kode_obat}
                helperText={errors.kode_obat?.message || ""}
              />
            )}
            />
        </FormControl>
            </Grid>
                       <Grid item xs={12} sm={6}>

            <FormControl fullWidth>
          <Controller
            name="kode_obat"
            control={control}
            rules={{ required: "Kode Obat harus diisi" }}
            render={({ field }) => (
              <TextField
              {...field}
                label="Kode Obat"
                variant="outlined"
                fullWidth
                disabled
                error={!!errors.kode_obat}
                helperText={errors.kode_obat?.message || ""}
              />
            )}
            />
        </FormControl>
            </Grid>
             <Grid item xs={12} sm={6}>

            <FormControl fullWidth>
          <Controller
            name="kode_obat"
            control={control}
            rules={{ required: "Kode Obat harus diisi" }}
            render={({ field }) => (
              <TextField
              {...field}
                label="Kode Obat"
                variant="outlined"
                fullWidth
                disabled
                error={!!errors.kode_obat}
                helperText={errors.kode_obat?.message || ""}
              />
            )}
            />
        </FormControl>
            </Grid>
           <FormControl fullWidth>
                  <Controller
                    name="kode_obat"
                    control={control}
                    rules={{ required: "Kode Obat harus diisi" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Kode Obat"
                        variant="outlined"
                        fullWidth
                        disabled
                        error={!!errors.kode_obat}
                        helperText={errors.kode_obat?.message || ""}
                      />
                    )}
                  />
                </FormControl>
                 
                </Grid>

                {/* Footer Tombol */}
                <Box sx={{ mt: 4 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" onClick={() => reset()} sx={{ px: 4, textTransform: "none", fontWeight: 'bold' }}>Batal</Button>
                        <Button type="submit" variant="contained" startIcon={<Save />} sx={{ px: 4, textTransform: "none", fontWeight: 'bold' }}>
                            Simpan Data
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}