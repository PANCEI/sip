import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Card, CardContent, Typography, Paper, Box, TextField, Button,
    Divider, IconButton, List, ListItem, InputAdornment
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PatientList from "./PatientList";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function Pemeriksaan() {
    const [token] = useLocalStorageEncrypt('token', null);
    const [user] = useLocalStorageEncrypt('user', null);
    const [dataPasien, setDataPasien] = useState([]);
    const [lastSelected, setLastSelected] = useState(null);

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            diagnosa: "",
            obat: [{ nama_obat: "", dosis: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "obat"
    });

    const getDataPasien = async () => {
        try {
            const { data, status } = await Api1('/pasien-today', 'GET', user, {
                Authorization: `Bearer ${token}`,
            });
            if (status === 200) setDataPasien(data.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { getDataPasien(); }, [token]);

    const handleSelectPatient = (patient) => {
        setLastSelected(patient);
        reset({ diagnosa: "", obat: [{ nama_obat: "", dosis: "" }] });
        setDataPasien((prev) => prev.filter((item) => item.id !== patient.id));
    };

    const onSubmit = (formData) => {
        const payload = { ...lastSelected, ...formData };
        console.log("Payload Simpan:", payload);
        alert("Data pemeriksaan berhasil disimpan!");
        setLastSelected(null);
    };

    return (
        <Box sx={{ p: 2, backgroundColor: "#f4f6f8", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
            <Card sx={{ borderRadius: 3, width: "100%", maxWidth: "1600px" }}>
                <CardContent>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                        <Box sx={{ p: 1, bgcolor: "#1976d2", borderRadius: 1, display: "flex" }}>
                            <AccountBoxIcon sx={{ color: "#fff" }} />
                        </Box>
                        <Typography variant="h6" fontWeight="800">Pemeriksaan Pasien</Typography>
                    </Box>

                    {/* Main Container Flex */}
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3 }}>
                        
                        {/* Sidebar: List Pasien */}
                        <Box sx={{ width: { xs: "100%", lg: "350px" }, flexShrink: 0 }}>
                            <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                                <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #eee" }}>
                                    <Typography variant="subtitle2" fontWeight="700">Antrean Pasien</Typography>
                                </Box>
                                <PatientList patients={dataPasien} onPatientClick={handleSelectPatient} onReload={getDataPasien} />
                            </Paper>
                        </Box>

                        {/* Content: Form Pemeriksaan */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Paper sx={{ p: 4, borderRadius: 2 }}>
                                {lastSelected ? (
                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        <Typography variant="h5" fontWeight="700" color="primary">Form Pemeriksaan</Typography>
                                        <Divider />

                                        {/* Row 1: Info Dasar */}
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                            <TextField sx={{ flex: "1 1 300px" }} label="Nama Pasien" value={lastSelected.pasien.nama_pasien} variant="filled" InputProps={{ readOnly: true }} />
                                            <TextField sx={{ flex: "1 1 200px" }} label="No. RM" value={lastSelected.pasien.no_rm} variant="filled" InputProps={{ readOnly: true }} />
                                        </Box>

                                        {/* Row 2: Alamat */}
                                        <TextField fullWidth label="Alamat" value={lastSelected.pasien.alamat} variant="filled" InputProps={{ readOnly: true }} />

                                        {/* Row 3: Vital Signs */}
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <TextField sx={{ flex: 1 }} label="Sistolik" value={lastSelected.sistolik} variant="filled" InputProps={{ readOnly: true, endAdornment: "mmHg" }} />
                                            <TextField sx={{ flex: 1 }} label="Diastolik" value={lastSelected.diastolik} variant="filled" InputProps={{ readOnly: true, endAdornment: "mmHg" }} />
                                        </Box>

                                        {/* Row 4: Keluhan */}
                                        <TextField fullWidth label="Keluhan Utama" value={lastSelected.keluhan} multiline rows={4} variant="filled" InputProps={{ readOnly: true }} />

                                        <Divider sx={{ my: 1 }}><Typography variant="caption" color="textSecondary">INPUT MEDIS</Typography></Divider>

                                        {/* Input Diagnosa */}
                                        <TextField 
                                            fullWidth label="Diagnosa Dokter" multiline rows={4}
                                            {...register("diagnosa", { required: "Diagnosa tidak boleh kosong" })}
                                            error={!!errors.diagnosa}
                                            helperText={errors.diagnosa?.message}
                                        />

                                        {/* Input Obat Dinamis */}
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="subtitle1" fontWeight="700">Resep Obat</Typography>
                                                <Button size="small" startIcon={<AddCircleOutlineIcon />} onClick={() => append({ nama_obat: "", dosis: "" })}>Tambah Obat</Button>
                                            </Box>
                                            
                                            {fields.map((item, index) => (
                                                <Box key={item.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                                                    <TextField 
                                                        sx={{ flex: 3 }} label="Nama Obat" size="small"
                                                        {...register(`obat.${index}.nama_obat`, { required: true })}
                                                        error={!!errors.obat?.[index]?.nama_obat}
                                                    />
                                                    <TextField 
                                                        sx={{ flex: 2 }} label="Dosis/Aturan" size="small"
                                                        {...register(`obat.${index}.dosis`, { required: true })}
                                                        error={!!errors.obat?.[index]?.dosis}
                                                    />
                                                    <IconButton color="error" onClick={() => remove(index)} disabled={fields.length === 1}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>

                                        <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} sx={{ py: 1.5, mt: 2 }}>
                                            Simpan Rekam Medis
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", border: "2px dashed #eee", borderRadius: 2 }}>
                                        <Typography color="textSecondary">Pilih pasien untuk memulai pemeriksaan</Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}