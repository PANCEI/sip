import { useForm, Controller } from "react-hook-form";
import { 
  TextField, Button, InputAdornment, Grid, 
  Stack, MenuItem, Divider 
} from "@mui/material";
import { 
  Save, Person, Badge, LocalHospital, 
  RestartAlt, Phone, Home, Cake, Wc 
} from "@mui/icons-material";

export default function FormPasien({ onSubmit, loading }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      no_rm: "",
      nama_pasien: "",
      nik: "",
      jenis_kelamin: "",
      tgl_lahir: "",
      telepon: "",
      alamat: ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Baris 1: No RM & NIK */}
       <Grid item xs={12} md={4}>
              <Controller
                name="no_rm"
                control={control}
                rules={{ required: "No. RM wajib diisi" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="No. Rekam Medis *"
                    placeholder="Contoh: RM-001"
                    error={!!errors.no_rm}
                    helperText={errors.no_rm?.message}
                    // Migrasi ke slotProps untuk menghilangkan garis coret
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalHospital fontSize="small" color="primary" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>
       <Grid item xs={12} md={8}>
  <Controller
    name="nik"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="NIK (No. KTP)"
        placeholder="16 digit nomor kependudukan..."
        // Menggunakan slotProps untuk input decoration terbaru
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Badge fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
    )}
  />
</Grid>

        {/* Baris 2: Nama Lengkap */}
        <Grid item xs={12}>
          <Controller
            name="nama_pasien"
            control={control}
            rules={{ required: "Nama pasien wajib diisi" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nama Lengkap Pasien *"
                error={!!errors.nama_pasien}
                helperText={errors.nama_pasien?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Person fontSize="small" color="primary" /></InputAdornment>,
                }}
              />
            )}
          />
        </Grid>

        {/* Baris 3: Jenis Kelamin & Tgl Lahir */}
        <Grid item xs={12} md={12}>
  <Controller
    name="tgl_lahir"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        type="date"
        label="Tanggal Lahir"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Cake fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
    )}
  />
</Grid> 

        {/* Baris 4: Telepon & Alamat */}
      <Grid item xs={12} md={4}>
  <Controller
    name="telepon"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="Nomor Telepon"
        placeholder="0812..."
       
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Phone fontSize="small" color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
    )}
  />
</Grid>
       
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button 
          variant="text" 
          color="inherit" 
          startIcon={<RestartAlt />}
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          startIcon={<Save />}
          disabled={loading}
          sx={{ px: 4, borderRadius: 2 }}
        >
          {loading ? "Menyimpan..." : "Simpan Data"}
        </Button>
      </Stack>  
    </form>
  );
}