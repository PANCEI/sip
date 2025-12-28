import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FormControl, TextField, Box, Typography, Paper, CircularProgress, Autocomplete, InputAdornment
} from "@mui/material";
import { Fingerprint } from "@mui/icons-material"; // Pastikan sudah install @mui/icons-material

export default function FormCheckUp() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nama_pasien: "" // Ini akan menyimpan ID atau Kode Pasien
        }
    });

    useEffect(() => {
        // Jangan mencari jika input terlalu pendek (misal kurang dari 2 huruf)
        if (inputValue.length < 2) {
            setOptions([]);
            return;
        }

        const getData = setTimeout(async () => {
            setLoading(true);
            try {
                // Ganti dengan endpoint API Anda yang sebenarnya
                const response = await fetch(`/api/pasien?search=${inputValue}`);
                const data = await response.json();
                setOptions(data); // Ekspektasi API: [{ no_rm: '001', nama_pasien: 'Budi' }]
            } catch (error) {
                console.error("Fetch error:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500); // Debounce 500ms

        return () => clearTimeout(getData);
    }, [inputValue]);

    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", maxWidth: 600, p: 5, borderRadius: 1 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
                        Pemeriksaan Pasien
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                        Pastikan data yang dimasukkan sesuai Keadaan Pasien.
                    </Typography>
                </Box>

                <form>
                    <FormControl fullWidth>
                        <Controller
                            name="nama_pasien"
                            control={control}
                            rules={{ required: "Pasien harus dipilih" }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    options={options}
                                    loading={loading}
                                    // Mencocokkan nilai ID yang tersimpan di form dengan opsi di list
                                    value={options.find((item) => item.no_rm === value) || null}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    getOptionLabel={(option) => 
                                        typeof option === 'string' ? option : `${option.no_rm} - ${option.nama_pasien}`
                                    }
                                    isOptionEqualToValue={(option, val) => option.no_rm === val.no_rm}
                                    filterOptions={(x) => x} 
                                    onChange={(_, newValue) => {
                                        // Simpan no_rm ke state form
                                        onChange(newValue ? newValue.no_rm : "");
                                    }}
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