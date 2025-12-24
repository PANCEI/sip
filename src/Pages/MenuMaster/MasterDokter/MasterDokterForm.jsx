import { 
  FormControl, 
  TextField, 
  Stack, 
  CircularProgress, 
  Box, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormHelperText 
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function MasterDokterForm({ onSubmit, initialData }) {
  const [token] = useLocalStorageEncrypt('token', null);
  const [loading, setLoading] = useState(true);
  const [masterPoli, setMasterPoli] = useState([]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      id: "",
      kode_dokter: "",
      nama_dokter: "",
      id_poli: "",
      spesialis: "",
      no_sip: "",
      no_telp: "",
      flag_delete: 0,
      status_dokter: "",
    }
  });

  // Fungsi ambil kode otomatis
  const getSIpAndCode = async () => {
    try {
      const { data, status } = await Api1('/generate-kode-dokter', 'GET', {}, {
        Authorization: `Bearer ${token}`
      });
      if (status === 200 && data.message === 'berhasil') {
        reset((prev) => ({
          ...prev,
          kode_dokter: data.data.kode_dokter,
          no_sip: data.data.no_sip,
          flag_delete: 0
        }));
      }
    } catch (err) {
      console.log('api gagal generate code', err);
    }
  };

  // Fungsi ambil data poli
  const getMasterPoli = async () => {
    try {
      const { data, status } = await Api1('/all-data-poli', 'GET', {}, {
        Authorization: `Bearer ${token}`
      });
      if (status === 200 && data.message === 'berhasil') {
        setMasterPoli(data.data);
      }
    } catch (err) {
      console.log('api gagal ambil poli', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Tunggu master poli dulu agar Select tidak error 'out-of-range'
      await getMasterPoli();

      if (initialData) {
        reset({
          id: initialData.id || "",
          kode_dokter: initialData.kode_dokter || "",
          nama_dokter: initialData.nama_dokter || "",
          id_poli: initialData.id_poli || "",
          spesialis: initialData.spesialis || "",
          no_sip: initialData.no_sip || "",
          no_telp: initialData.no_telp || "",
          flag_delete: initialData.flag_delete || 0,
          status_dokter: initialData.status_dokter || ""
        });
      } else {
        await getSIpAndCode();
      }
      setLoading(false);
    };
    fetchData();
  }, [initialData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Kode Dokter */}
          <FormControl fullWidth>
            <Controller
              name="kode_dokter"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Kode Dokter"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </FormControl>

          {/* No SIP */}
          <FormControl fullWidth>
            <Controller
              name="no_sip"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="No Sip"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </FormControl>

          {/* Nama Dokter */}
          <FormControl fullWidth error={!!errors.nama_dokter}>
            <Controller
              name="nama_dokter"
              control={control}
              rules={{ required: "Nama dokter harus di isi" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nama Dokter"
                  variant="outlined"
                  fullWidth
                  error={!!errors.nama_dokter}
                  helperText={errors.nama_dokter?.message}
                />
              )}
            />
          </FormControl>

          {/* Pilih Poli */}
          <FormControl fullWidth error={!!errors.id_poli}>
            <InputLabel id="id-poli-label">Poli</InputLabel>
            <Controller
              name="id_poli"
              control={control}
              rules={{ required: "Poli harus di pilih" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="id-poli-label"
                  label="Poli"
                  value={field.value || ""}
                >
                  {masterPoli.length > 0 ? (
                    masterPoli.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.kode_poli} - {item.nama_poli}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>Data poli tidak tersedia</MenuItem>
                  )}
                </Select>
              )}
            />
            <FormHelperText>{errors.id_poli?.message}</FormHelperText>
          </FormControl>

          {/* Spesialis */}
          <FormControl fullWidth error={!!errors.spesialis}>
            <Controller
              name="spesialis"
              control={control}
             
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Spesialis"
                  variant="outlined"
                  fullWidth
                 
                />
              )}
            />
          </FormControl>

          {/* No Telepon */}
          <FormControl fullWidth error={!!errors.no_telp}>
            <Controller
              name="no_telp"
              control={control}
              rules={{ required: "Nomor telepon harus di isi" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="No Telepon"
                  variant="outlined"
                  fullWidth
                  error={!!errors.no_telp}
                  helperText={errors.no_telp?.message}
                />
              )}
            />
          </FormControl>

          {/* Status Dokter */}
          <FormControl fullWidth error={!!errors.status_dokter}>
            <InputLabel id="id-status-dokter">Status Dokter</InputLabel>
            <Controller
              name="status_dokter"
              control={control}
              rules={{ required: "Status dokter harus di pilih" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="id-status-dokter"
                  label="Status Dokter"
                  value={field.value || ""}
                >
                  <MenuItem value="PNS">PNS</MenuItem>
                  <MenuItem value="Non PNS">Non PNS</MenuItem>
                  <MenuItem value="Kontrak">Kontrak</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.status_dokter?.message}</FormHelperText>
          </FormControl>

          {/* Tombol Submit */}
          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "white",
              padding: "12px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            {initialData ? "Simpan Perubahan" : "Tambah Dokter"}
          </button>
        </Stack>
      </form>
    </>
  );
}