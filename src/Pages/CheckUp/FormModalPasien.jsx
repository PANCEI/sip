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
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
export default function FormModalPasien({ onSubmit, initialData }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      id: "",
      no_rm: "",
      nama_pasien: "",
      alamat: "",
      tgl_lahir: "",
      deskripsi: ""
    }
  })
  useEffect(() => {
    if (initialData) {
      reset({
        id: initialData.id,
        nama_pasien: initialData.nama_pasien,
        no_rm: initialData.no_rm,
        alamat: initialData.alamat,
        tgl_lahir: initialData.tanggal_lahir,
        deskripsi: initialData.deskripsi
      })
    }
  }, [initialData])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <Controller
              name="no_rm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Kode RM"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="nama_pasien"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nama Pasien"
                  variant="outlined"
                  fullWidth

                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="alamat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Alamat"
                  variant="outlined"
                  fullWidth

                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="tgl_lahir"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Tanggal Lahir"
                  variant="outlined"
                  fullWidth

                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="deskripsi"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                
                  label="Deskripsi"
                  variant="outlined"
                  fullWidth

                />
              )}
            />
          </FormControl>
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
            Simpan Perubahan
          </button>
        </Stack>
      </form>
    </>
  );

}
