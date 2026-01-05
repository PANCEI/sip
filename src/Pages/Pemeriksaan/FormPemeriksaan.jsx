import { useState, useEffect, useCallback } from "react";
import { Box, TextField, Button, Typography, IconButton, Autocomplete, Divider, CircularProgress, createFilterOptions } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Delete'; // Perbaikan Icon jika perlu
import { Api1 } from "../../utils/Api1";

// Agar Autocomplete tidak memfilter ulang hasil dari API
const filterOptions = createFilterOptions({ stringify: (option) => option.nama_obat });

export default function FormPemeriksaan({ register, control, fields, append, remove, handleSubmit, onSubmit, errors, setValue, token, user }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const fetchObat = useCallback(async (query) => {
        if (!query || query.length < 2) {
            setOptions([]); // Kosongkan pilihan jika input terlalu pendek
            return;
        }

        setLoading(true);
        try {
            const { data, status } = await Api1(`/obat-search?search=${query}`, 'GET', user, {
                Authorization: `Bearer ${token}`,
            });

            // PERBAIKAN: Typo .lenght menjadi .length
            if (status === 200 && data.data && data.data.length > 0) {
                setOptions(data.data);
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetch obat:", error);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    }, [token, user]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue) {
                fetchObat(inputValue);
            }
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
                    <Button size="small" startIcon={<AddCircleOutlineIcon />} onClick={() => append({ nama_obat: "", dosis: "", kode_obat: "" })}>
                        TAMBAH OBAT
                    </Button>
                </Box>

                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                        <Autocomplete
                            sx={{ flex: 3 }}
                            options={options}
                            loading={loading}
                            filterOptions={(x) => x} // Penting: Biarkan API yang melakukan filtering
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') return option;
                                return option.kode_obat ? `${option.nama_obat} - ${option.satuan.satuan}` : option.nama_obat || "";
                            }}
                            isOptionEqualToValue={(option, value) => option.kode_obat === value.kode_obat}
                            onInputChange={(e, value) => setInputValue(value)}
                            onChange={(e, newValue) => {
                                // PERBAIKAN: Gunakan kode_obat sesuai response API Anda
                                setValue(`obat.${index}.nama_obat`, newValue?.nama_obat || "");
                                setValue(`obat.${index}.kode_obat`, newValue?.kode_obat || "");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Cari Obat..."
                                    size="small"
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

            <Button fullWidth type="submit" variant="contained" size="large" sx={{ py: 1.5, borderRadius: 2 }}>
                SIMPAN REKAM MEDIS
            </Button>
        </Box>
    );
}