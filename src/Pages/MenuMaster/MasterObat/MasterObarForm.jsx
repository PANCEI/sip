import { FormControl, TextField, Stack, CircularProgress, Box, Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function MasterObatForm({ onSubmit, initialData }) {
  const [token] = useLocalStorageEncrypt("token", null);
  const [loading, setLoading] = useState(true);

  const [satuanObat, setSatuanObat] = useState([]);
  const [kategoriObat, setKategoriObat] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kode_obat: "",
      nama_obat: "",
      flag_delete: "",
      id_satuan: "",
      kandungan: "",
      id_kategori: [], // multiple category
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (initialData) {
        reset({
          kode_obat: initialData.kode_obat,
          nama_obat: initialData.nama_obat,
          flag_delete: initialData.flag_delete,
          id_satuan: initialData.id_satuan,
          kandungan: initialData.Kandungan,
           id_kategori: initialData.kategori
      ? initialData.kategori.map((item) => item.id)
      : [], // ← mapping kategori
        });
        await getSatuanObat();
        await getDataKategoriObat();
        setLoading(false);
      } else {
        await getKodeObat();
        await getSatuanObat();
        await getDataKategoriObat();
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
        reset((prev) => ({
          ...prev,
          kode_obat: data.data,
          flag_delete: "tidak",
        }));
      }
    } catch (error) {
      console.error("Gagal ambil kode obat:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSatuanObat = async () => {
    try {
      const { data, status } = await Api1(
        "/all-satuan-medicine",
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (status === 200 && data?.data) {
        setSatuanObat(data.data);
      }
    } catch (error) {
      console.error("Gagal ambil satuan obat:", error);
    }
  };

  const getDataKategoriObat = async () => {
    try {
      const { data, status } = await Api1(
        "/all-katogori-medicine",
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (status === 200 && data?.data) {
        setKategoriObat(data.data);
      }

    } catch (error) {
      console.error("gagal mengambil data kategori obat:", error);
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

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

        {/* Kandungan */}
        <FormControl fullWidth>
          <Controller
            name="kandungan"
            control={control}
            rules={{ required: "Kandungan Obat harus diisi" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Kandungan Obat"
                variant="outlined"
                fullWidth
                error={!!errors.kandungan}
                helperText={errors.kandungan?.message || ""}
              />
            )}
          />
        </FormControl>

        {/* Select Satuan Obat */}
        <FormControl fullWidth error={!!errors.id_satuan}>
          <InputLabel id="id-satuan-label">Satuan Obat</InputLabel>

          <Controller
            name="id_satuan"
            control={control}
            rules={{ required: "Satuan Obat harus diisi" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="id-satuan-label"
                label="Satuan Obat"
              >
                {satuanObat.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.satuan}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.id_satuan && (
            <p style={{ color: "red", fontSize: "13px" }}>{errors.id_satuan.message}</p>
          )}
        </FormControl>

        {/* 🔥 MULTIPLE SELECT KATEGORI OBAT */}
        <FormControl fullWidth error={!!errors.id_kategori}>
          <InputLabel id="kategori-label">Kategori Obat</InputLabel>

          <Controller
            name="id_kategori"
            control={control}
            rules={{ required: "Kategori Obat harus dipilih" }}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                labelId="kategori-label"
                label="Kategori Obat"
              >
                {kategoriObat.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nama_kategori}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {errors.id_kategori && (
            <p style={{ color: "red", fontSize: "13px" }}>{errors.id_kategori.message}</p>
          )}
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
