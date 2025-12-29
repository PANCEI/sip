import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FormControl, TextField, Box, Typography, Paper, CircularProgress, Autocomplete, InputAdornment
} from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function FormCheckUp() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // State tambahan untuk menyimpan objek pasien yang sedang dipilih
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [token] = useLocalStorageEncrypt('token', null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nama_pasien: "" 
        }
    });

    useEffect(() => {
        // HANYA ambil data jika user sedang mengetik (bukan saat memilih dari list)
        if (inputValue.length < 2) {
            setOptions([]);
            return;
        }

        const getData = setTimeout(async () => {
            setLoading(true);
            try {
                const { data, status } = await Api1(`/get-pasien-check?search=${inputValue}`, 'GET', {}, {
                    Authorization: `Bearer ${token}`
                });
                if (status === 200) {
                    setOptions(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(getData);
    }, [inputValue, token]);

    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 1 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
                        Pemeriksaan Pasien
                    </Typography>
                </Box>

                <form>
                    <FormControl fullWidth>
                        <Controller
                            name="nama_pasien"
                            control={control}
                            rules={{ required: "Pasien harus dipilih" }}
                            render={({ field: { onChange } }) => (
                                <Autocomplete
                                    options={options}
                                    loading={loading}
                                    // Gunakan state selectedPatient agar label tetap muncul
                                    value={selectedPatient}
                                    onInputChange={(event, newInputValue, reason) => {
                                        // Mencegah API terpanggil ulang saat item dipilih (reason: 'reset')
                                        if (reason === 'input') {
                                            setInputValue(newInputValue);
                                        }
                                    }}
                                    onChange={(_, newValue) => {
                                        // Simpan objek lengkap ke state lokal untuk tampilan
                                        console.log(newValue);
                                        setSelectedPatient(newValue);
                                        // Simpan no_rm ke react-hook-form
                                        onChange(newValue ? newValue.no_rm : "");
                                    }}
                                    getOptionLabel={(option) => 
                                        option ? `${option.no_rm} - ${option.nama_pasien}` : ""
                                    }
                                    isOptionEqualToValue={(option, value) => option.no_rm === value.no_rm}
                                    filterOptions={(x) => x} // Data sudah difilter oleh API
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Cari No. RM / Nama Pasien"
                                            error={!!errors.nama_pasien}
                                            helperText={errors.nama_pasien?.message}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <>
                                                        <InputAdornment position="start">
                                                            <Fingerprint color="primary" />
                                                        </InputAdornment>
                                                        {params.InputProps.startAdornment}
                                                    </>
                                                ),
                                                endAdornment: (
                                                    <>
                                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                    </FormControl>
                </form>
            </Paper>
        </Box>
    );
}