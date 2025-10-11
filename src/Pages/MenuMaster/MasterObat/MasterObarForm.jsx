import { FormControl, TextField, Stack, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function MasterObatForm({ onSubmit, initialData }) {
  const [token] = useLocalStorageEncrypt("token", null);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      kode_obat: "",
      nama_obat: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (initialData) {
        reset({
          kode_obat: initialData.kode_obat,
          nama_obat: initialData.nama_obat,
        });
        setLoading(false);
      } else {
        await getKodeObat();
      }
    };
    fetchData();
  }, [initialData]);

  const getKodeObat = async () => {
    try {
      const { data, status } = await Api1(
        "/generate-code",
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (status === 200 && data?.data) {
        reset({
          kode_obat: data.data,
          nama_obat: "",
        });
      }
    } catch (error) {
      console.error("Gagal ambil kode obat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      kode_obat: data.kode_obat,
      nama_obat: data.nama_obat,
    });
  };

  // 🔹 Tampilkan spinner dulu kalau masih loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
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

        <FormControl fullWidth>
          <Controller
            name="nama_obat"
            control={control}
            rules={{ required: "Nama Obat harus diisi" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nama Obat"
                variant="outlined"
                fullWidth
                error={!!errors.nama_obat}
                helperText={errors.nama_obat?.message || ""}
              />
            )}
          />
        </FormControl>

        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Simpan
        </button>
      </Stack>
    </form>
  );
}
