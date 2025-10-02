import { useEffect } from "react";
import { Stack, FormControl, TextField, Select, MenuItem, InputLabel, Button, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// Tambahkan prop `initialData` dan `onClose`
export default function MenuMasterForm({ onSubmit, initialData }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // <-- Tambahkan `reset` dari `useForm`
  } = useForm({
    defaultValues: {
      id_menu: null, // <-- Tambahkan field ID untuk operasi edit
      namamenu: "",
      jenis: "",
      urutan: "",
    },
  });

  // Gunakan `useEffect` untuk mengisi form saat `initialData` berubah
  useEffect(() => {
    if (initialData) {
      // Menggunakan `reset` untuk mengisi form dengan data dari `initialData`
      reset({
        id_menu: initialData.id,
        namamenu: initialData.menu,
        jenis: initialData.jenis,
        urutan: initialData.urutan,
      });
    } else {
      // Mengosongkan form jika tidak ada data awal (mode tambah)
      reset({
        id_menu: null,
        namamenu: "",
        jenis: "",
        urutan: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    // Sesuaikan nama field agar sesuai dengan API
    const formattedData = {
      id: data.id_menu, // Kirim ID jika ada
      menu: data.namamenu,
      jenis: data.jenis,
      urutan: parseInt(data.urutan, 10),
    };
    onSubmit(formattedData);
  };
console.log(initialData);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
        {/* Input Nama Menu */}
        <FormControl fullWidth>
          <Controller
            name="namamenu"
            control={control}
            rules={{ required: "Nama Menu wajib diisi." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nama Menu"
                variant="outlined"
                fullWidth
                error={!!errors.namamenu}
                helperText={errors.namamenu ? errors.namamenu.message : ""}
              />
            )}
          />
        </FormControl>

        {/* Input Jenis */}
        <FormControl fullWidth error={!!errors.jenis}>
          <InputLabel id="jenis-label">Jenis</InputLabel>
          <Controller
            name="jenis"
            control={control}
            rules={{ required: "Jenis wajib dipilih." }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="jenis-label"
                id="jenis"
                label="Jenis"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="File">File</MenuItem>
                <MenuItem value="Folder">Folder</MenuItem>
              </Select>
            )}
          />
          {errors.jenis && <FormHelperText>{errors.jenis.message}</FormHelperText>}
        </FormControl>

        {/* Input Urutan */}
        <FormControl fullWidth>
          <Controller
            name="urutan"
            control={control}
            rules={{
              required: "Urutan wajib diisi.",
              min: {
                value: 1,
                message: "Urutan harus lebih dari 0."
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Urutan"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.urutan}
                helperText={errors.urutan ? errors.urutan.message : ""}
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