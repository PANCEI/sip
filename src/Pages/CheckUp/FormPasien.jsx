import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { 
  TextField, Button, InputAdornment, Grid, 
  Stack, Divider, CircularProgress // Tambahkan CircularProgress
} from "@mui/material";
import { 
  Save, Person, Badge, LocalHospital, 
  RestartAlt, Phone, Cake 
} from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function FormPasien({ onSubmit, loading }) {
  const [token] = useLocalStorageEncrypt('token', null);
  // Tambahkan state loading khusus untuk Get RM
  const [loadingRM, setLoadingRM] = useState(false);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      no_rm: "",
      nama_pasien: "",
      tgl_lahir: "",
      alamat: "",
      deskripsi: "",
    }
  });

  const getkoderm = useCallback(async () => {
    setLoadingRM(true); // Mulai loading
    try {
      const { data, status } = await Api1('/get-rm', 'GET', {}, {
        Authorization: `Bearer ${token}`
      });
      
      if (status === 200 && data) {
        setValue("no_rm", data.data); 
      }
    } catch (error) {
      console.log('gagal dari api', error);
    } finally {
      setLoadingRM(false); // Matikan loading apapun hasilnya
    }
  }, [token, setValue]);

  useEffect(() => {
    if (token) {
      getkoderm();
    }
  }, [token, getkoderm]);

  const handleInternalSubmit = async (data) => {
    await onSubmit(data); 
    reset();
    getkoderm(); 
  };

  return (
    <form onSubmit={handleSubmit(handleInternalSubmit)}>
      <Grid container spacing={3}>
        {/* Field No RM dengan Loading Indicator */}
        <Grid item xs={12} md={4}>
          <Controller
            name="no_rm"
            control={control}
            rules={{ required: "No. RM wajib diisi" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                disabled // Tetap disabled agar user tidak input manual
                label={loadingRM ? "Mengambil No. RM..." : "No. Rekam Medis *"}
                placeholder="RM-XXXX"
                error={!!errors.no_rm}
                helperText={errors.no_rm?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalHospital fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                    // Tampilkan Spinner kecil di kanan saat loading
                    endAdornment: loadingRM ? (
                      <InputAdornment position="end">
                        <CircularProgress size={20} color="inherit" />
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />
            )}
          />
        </Grid>

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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* ... field alamat, tgl_lahir, telepon tetap sama ... */}
        <Grid item xs={12} md={8}>
          <Controller
            name="alamat"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Alamat"
                placeholder="Masukan Alamat Pasien"
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
                  inputLabel: { shrink: true },
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

        <Grid item xs={12} md={4}>
          <Controller
            name="deskripsi"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Deskripsi"
                placeholder="Masukan Deskripsi"
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
          onClick={() => {
            reset();
            getkoderm(); // Ambil kode baru saat reset
          }}
        >
          Reset
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          startIcon={<Save />}
          disabled={loading || loadingRM} // Disable tombol jika sedang loading API
          sx={{ px: 4, borderRadius: 2 }}
        >
          {loading ? "Menyimpan..." : "Simpan Data"}
        </Button>
      </Stack> 
    </form>
  );
}