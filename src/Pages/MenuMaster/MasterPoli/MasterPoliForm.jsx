import {
    
    TextField,
    Stack,
    Button,
    CircularProgress,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function MasterPoliForm({ onSubmit, initialData }) {
    const [token] = useLocalStorageEncrypt("token", null);
    const [loading, setLoading] = useState(true);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: null,
            kode_poli: "",
            nama_poli: "",
            deskripsi: "",
            is_active: 1,
        },
    });

    // set data edit
    useEffect(() => {
        if (initialData) {
            reset({
                id: initialData.id,
                kode_poli: initialData.kode_poli,
                nama_poli: initialData.nama_poli,
                deskripsi: initialData.deskripsi,
                is_active: initialData.is_active,
            });
        } else {
            reset({
                id: null,
                kode_poli: "",
                nama_poli: "",
                deskripsi: "",
                is_active: 1,
            });
        }
    }, [initialData, reset]);

    // generate kode poli (hanya saat tambah)
    useEffect(() => {
        if (!initialData) {
            getDataKodePoli();
        }
    }, [initialData]);

    const getDataKodePoli = async () => {
        try {
            const { data, status } = await Api1(
                "/generate-code-poli",
                "GET",
                {},
                { Authorization: `Bearer ${token}` }
            );
            if (status === 200) {
                reset((prev) => ({
                    ...prev,
                    kode_poli: data.data,
                }));
            }
        } catch (error) {
            console.log("error get kode poli", error);
        } finally {
            setLoading(false);
        }
    };
     if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        );
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Controller
                    name="kode_poli"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Kode Poli"
                            disabled
                        />
                    )}
                />

                <Controller
                    name="nama_poli"
                    control={control}
                    rules={{ required: "Nama poli wajib diisi" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nama Poli"
                            error={!!errors.nama_poli}
                            helperText={errors.nama_poli?.message}
                        />
                    )}
                />

                <Controller
                    name="deskripsi"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Deskripsi"
                            multiline
                            rows={3}
                        />
                    )}
                />

                <Button type="submit" variant="contained">
                    Simpan
                </Button>
            </Stack>
        </form>
    );
}
