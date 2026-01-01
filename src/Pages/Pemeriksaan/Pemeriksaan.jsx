import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Typography, Paper, Box, TextField, Button,
    Divider, IconButton, Chip
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import PatientList from "./PatientList";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function Pemeriksaan() {
    const [token] = useLocalStorageEncrypt('token', null);
    const [user] = useLocalStorageEncrypt('user', null);
    const [dataPasien, setDataPasien] = useState([]);
    const [lastSelected, setLastSelected] = useState(null);

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { diagnosa: "", obat: [{ nama_obat: "", dosis: "" }] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "obat" });

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
        
        // MENGHAPUS PASIEN DARI LIST SETELAH DIPILIH
        setDataPasien((prev) => prev.filter((item) => item.id !== patient.id));
    };

    const onSubmit = (formData) => {
        console.log("Simpan Data:", { ...lastSelected, ...formData });
        alert("Pemeriksaan Berhasil Disimpan");
        setLastSelected(null);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
            
            {/* HEADER */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                <Box sx={{ p: 1, bgcolor: "#1976d2", borderRadius: 1.5, display: "flex" }}>
                    <AccountBoxIcon sx={{ color: "#fff", fontSize: 24 }} />
                </Box>
                <Typography variant="h6" fontWeight="800" color="#2c3e50">
                    {lastSelected ? `Memeriksa: ${lastSelected.pasien.nama_pasien}` : "Pemeriksaan Pasien"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                
                {/* SISI KIRI: LIST ANTREAN */}
                <Box sx={{ width: "320px", flexShrink: 0 }}>
                    <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e6ed", overflow: "hidden" }}>
                        <Box sx={{ p: 2, borderBottom: "1px solid #e0e6ed", bgcolor: "#fff" }}>
                            <Typography variant="subtitle2" fontWeight="700">Antrean Pasien</Typography>
                            <Typography variant="caption" color="textSecondary">{dataPasien.length} PASIEN TERSEDIA</Typography>
                        </Box>
                        <Box sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            <PatientList 
                                patients={dataPasien} 
                                onPatientClick={handleSelectPatient} 
                                onReload={getDataPasien} 
                            />
                        </Box>
                    </Paper>
                </Box>

                {/* SISI KANAN: DETAIL & FORM DENGAN ANIMASI */}
                <Box sx={{ flexGrow: 1 }}>
                    {lastSelected ? (
                        <Box 
                            key={lastSelected.id} 
                            sx={{ 
                                display: "flex", 
                                gap: 3, 
                                alignItems: "flex-start",
                                animation: "slideInRight 0.4s ease-out" 
                            }}
                        >
                            {/* COLUMN 1: DATA PASIEN */}
                            <Box sx={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: 3 }}>
                                <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                                    <Typography variant="caption" fontWeight="700" color="primary" sx={{ display: 'block', mb: 1 }}>DATA PASIEN AKTIF</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    
                                    <Typography variant="caption" color="textSecondary">Nama Lengkap</Typography>
                                    <Typography variant="body2" fontWeight="700" sx={{ mb: 2 }}>{lastSelected.pasien.nama_pasien}</Typography>
                                    
                                    <Typography variant="caption" color="textSecondary">No. Rekam Medis</Typography>
                                    <Typography variant="body2" fontWeight="700" sx={{ mb: 2 }}>{lastSelected.pasien.no_rm}</Typography>

                                    <Typography variant="caption" color="textSecondary">Vital Sign</Typography>
                                    <Box sx={{ mb: 2, mt: 0.5 }}>
                                        <Chip label={`TD: ${lastSelected.sistolik}/${lastSelected.diastolik}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                    </Box>

                                    <Typography variant="caption" color="textSecondary">Keluhan Utama</Typography>
                                    <Box sx={{ p: 1.5, bgcolor: "#fffde7", borderRadius: 2, border: "1px solid #fff59d", mt: 0.5 }}>
                                        <Typography variant="body2">"{lastSelected.keluhan}"</Typography>
                                    </Box>
                                </Paper>

                                <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                                        <HistoryIcon fontSize="small" color="action" />
                                        <Typography variant="subtitle2" fontWeight="700">Riwayat Terakhir</Typography>
                                    </Box>
                                    <Divider sx={{ mb: 1 }} />
                                    <Box>
                                        <Typography variant="caption" color="primary" fontWeight="700">01 Jan 2026</Typography>
                                        <Typography variant="body2" fontWeight="700">Diagnosa: Influenza</Typography>
                                        <Typography variant="caption" color="textSecondary">Obat: Paracetamol, Vitamin C</Typography>
                                    </Box>
                                </Paper>
                            </Box>

                            {/* COLUMN 2: PEMERIKSAAN DOKTER */}
                            <Paper sx={{ flex: "2 1 600px", p: 4, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                                <Typography variant="h6" fontWeight="700" color="primary" gutterBottom>Pemeriksaan Dokter</Typography>
                                <Divider sx={{ mb: 3 }} />
                                
                                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <TextField 
                                        fullWidth label="Diagnosa / Analisa Medis" multiline rows={6}
                                        {...register("diagnosa", { required: "Wajib diisi" })}
                                        error={!!errors.diagnosa}
                                        helperText={errors.diagnosa?.message}
                                    />

                                    <Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                            <Typography variant="subtitle2" fontWeight="700">Resep Obat</Typography>
                                            <Button size="small" startIcon={<AddCircleOutlineIcon />} onClick={() => append({ nama_obat: "", dosis: "" })} sx={{ fontWeight: 'bold' }}>TAMBAH</Button>
                                        </Box>
                                        {fields.map((item, index) => (
                                            <Box key={item.id} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                                                <TextField 
                                                    sx={{ flex: 3 }} label="Nama Obat" size="small"
                                                    {...register(`obat.${index}.nama_obat`, { required: true })}
                                                />
                                                <TextField 
                                                    sx={{ flex: 2 }} label="Aturan Pakai" size="small"
                                                    {...register(`obat.${index}.dosis`, { required: true })}
                                                />
                                                <IconButton color="error" onClick={() => remove(index)} disabled={fields.length === 1}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Button 
                                        fullWidth type="submit" variant="contained" 
                                        size="large" startIcon={<SaveIcon />}
                                        sx={{ py: 1.5, mt: 2, fontWeight: "bold", borderRadius: 2 }}
                                    >
                                        SIMPAN REKAM MEDIS
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    ) : (
                        <Paper sx={{ 
                            height: "500px", display: "flex", justifyContent: "center", 
                            alignItems: "center", borderRadius: 3, border: "2px dashed #cbd5e1",
                            bgcolor: "transparent"
                        }}>
                            <Typography color="textSecondary">Silakan pilih pasien dari antrean untuk memulai pemeriksaan</Typography>
                        </Paper>
                    )}
                </Box>
            </Box>

            <style>
                {`
                    @keyframes slideInRight {
                        from {
                            opacity: 0;
                            transform: translateX(100px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}
            </style>
        </Box>
    );
} 