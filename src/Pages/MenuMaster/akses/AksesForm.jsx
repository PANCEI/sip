import { useEffect } from "react";
import { Stack, FormControl , TextField,InputLabel, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
// Tambahkan prop `initialData` dan `onClose`
export default function AksesForm({onSubmit, initialData}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // <-- Tambahkan `reset` dari `useForm`
  } = useForm({
    defaultValues: {
      id: null, // <-- Tambahkan field ID untuk operasi edit
      akses: "",   
    },
  });
    // Gunakan `useEffect` untuk mengisi form saat `initialData` berubah
    useEffect(()=>{
        if (initialData){
            // Menggunakan `reset` untuk mengisi form dengan data dari `initialData`
            reset({
                id: initialData.id,
                akses: initialData.akses,
            });
        } else {
            // Mengosongkan form jika tidak ada data awal (mode tambah)
            reset({
                id: null,
                akses: "",
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data) => {
        // Sesuaikan nama field agar sesuai dengan API
        const formattedData = {
            id: data.id, // Kirim ID jika ada
            akses: data.akses,
        };
        onSubmit(formattedData);
    };
    return (
        <form onSubmit = {handleSubmit(handleFormSubmit)}>
            <Stack spacing={3}>
            <FormControl fullWidth>
                 <Controller
            name="akses"
            control={control}
            rules={{ required: "Nama Akses wajib diisi." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nama Akses"
                variant="outlined"
                fullWidth
                error={!!errors.akses}
                helperText={errors.akses ? errors.akses.message : ""}
              />
            )}
          />
            </FormControl>
            <Button type="submit" variant="contained" size="large" fullWidth>
          {initialData ? "Update" : "Submit"}
        </Button>
            </Stack>
        </form>
    );
}