import { useState, useEffect, useCallback } from "react";
import { Box, TextField, Button, Typography, IconButton, Autocomplete, Divider, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Api1 } from "../../utils/Api1";

export default function FormPemeriksaan({ register, control, fields, append, remove, handleSubmit, onSubmit, errors, setValue, token, user }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Fungsi Fetch ke API Obat
    const fetchObat = useCallback(async (query) => {
        if (!query || query.length < 2) return;
        setLoading(true);
        try {
            const { data, status } = await Api1(`/obat-search?q=${query}`, 'GET', user, {
                Authorization: `Bearer ${token}`,
            });
            if (status === 200) setOptions(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token, user]);

    // Debouncing Logik
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue) fetchObat(inputValue);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [inputValue, fetchObat]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" fontWeight="700" color="primary">Pemeriksaan Dokter</Typography>
            <Divider />
            
            <TextField 
                fullWidth label="Diagnosa / Analisa Medis" multiline rows={6}
                {...register("diagnosa", { required: "Diagnosa wajib diisi" })}
                error={!!errors.diagnosa}
                helperText={errors.diagnosa?.message}
            />

            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="700">Resep Obat</Typography>
                    <Button size="small" startIcon={<AddCircleOutlineIcon />} onClick={() => append({ nama_obat: "", dosis: "", id_obat: "" })}>
                        TAMBAH OBAT
                    </Button>
                </Box>

                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                        <Autocomplete
                            sx={{ flex: 3 }}
                            options={options}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.nama_obat || ""}
                            onInputChange={(e, value) => setInputValue(value)}
                            onChange={(e, newValue) => {
                                setValue(`obat.${index}.nama_obat`, newValue?.nama_obat || "");
                                setValue(`obat.${index}.id_obat`, newValue?.id || "");
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Cari Obat..." size="small" 
                                    InputProps={{
                                        ...params.InputProps,
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
                        <TextField sx={{ flex: 2 }} label="Dosis" size="small" {...register(`obat.${index}.dosis`)} />
                        <IconButton color="error" onClick={() => remove(index)} disabled={fields.length === 1}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            <Button fullWidth type="submit" variant="contained" size="large" startIcon={<SaveIcon />} sx={{ py: 1.5, borderRadius: 2 }}>
                SIMPAN REKAM MEDIS
            </Button>
        </Box>
    );
}