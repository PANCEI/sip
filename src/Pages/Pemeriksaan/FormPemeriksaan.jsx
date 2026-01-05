import { useState, useEffect, useCallback } from "react";
import { Box, TextField, Button, Typography, IconButton, Autocomplete, Divider, CircularProgress, createFilterOptions } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Api1 } from "../../utils/Api1";

const filterOptions = createFilterOptions({ stringify: (option) => option.nama_obat });

export default function FormPemeriksaan({ register, control, fields, append, remove, handleSubmit, onSubmit, errors, setValue, token, user }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const fetchObat = useCallback(async (query) => {
        if (!query || query.length < 2) {
            setOptions([]);
            return;
        }

        setLoading(true);
        try {
            const { data, status } = await Api1(`/obat-search?search=${query}`, 'GET', user, {
                Authorization: `Bearer ${token}`,
            });

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
                    {/* PERUBAHAN: Tambahkan 'jumlah' di append */}
                    <Button
                        size="small"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => append({ nama_obat: "", dosis: "", kode_obat: "", jumlah: "" })}
                    >
                        TAMBAH OBAT
                    </Button>
                </Box>

                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "flex-start" }}>
                        <Autocomplete
                            sx={{ flex: 4 }}
                            options={options}
                            loading={loading}
                            filterOptions={(x) => x}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') return option;
                                return option.kode_obat ? `${option.nama_obat} - ${option.satuan?.satuan || ''}` : option.nama_obat || "";
                            }}
                            isOptionEqualToValue={(option, value) => option.kode_obat === value.kode_obat}
                            onInputChange={(e, value) => setInputValue(value)}
                            onChange={(e, newValue) => {
                                setValue(`obat.${index}.nama_obat`, newValue?.nama_obat || "");
                                setValue(`obat.${index}.kode_obat`, newValue?.kode_obat || "");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Cari Obat..."
                                    size="small"
                                    // GANTI InputProps menjadi slotProps
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* INPUTAN DOSIS */}
                        <TextField
                            sx={{ flex: 2 }}
                            label="Dosis/Aturan"
                            placeholder="3x1"
                            size="small"
                            {...register(`obat.${index}.dosis`)}
                        />

                        {/* PERUBAHAN: INPUTAN JUMLAH OBAT */}
                        <TextField
                            sx={{ flex: 1.2 }}
                            label="Jumlah"
                            type="number"
                            size="small"
                           
                            {...register(`obat.${index}.jumlah`, { required: true })}
                        />

                        <IconButton
                            color="error"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                            sx={{ mt: 0.5 }}
                        >
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