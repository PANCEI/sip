import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PatientList from "./PatientList";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";
export default function Pemeriksaan() {
    const [token]= useLocalStorageEncrypt('token', null);
    // Gunakan useState agar list bisa dimanipulasi (dihapus)
    const [dataPasien, setDataPasien] = useState([
        { id: "001", name: "Budi Santoso", norm: "RM-2023-001" },
        { id: "002", name: "Siti Aminah", norm: "RM-2023-002" },
        { id: "003", name: "Andi Wijaya", norm: "RM-2023-003" },
        { id: "004", name: "Dewi Lestari", norm: "RM-2023-004" },
    ]);

    const getDataPasien= async ()=>{
        try{
            const {data , status}= await Api1()
        }catch(error){
            console.log(error);
        }
    }
    const [lastSelected, setLastSelected] = useState(null);

    const handleSelectPatient = (patient) => {
        // 1. Simpan data yang dipilih ke state (untuk ditampilkan di kanan jika perlu)
        setLastSelected(patient);

        // 2. Hapus pasien dari list berdasarkan ID
        setDataPasien((prevList) => prevList.filter((item) => item.id !== patient.id));

        console.log(`Pasien ${patient.name} dipilih dan dihapus dari daftar.`);
    };
    const handleReloadData = () => {
        console.log("Mengambil data ulang...");
        // Contoh reset data dummy
        setDataPasien([
            { id: "001", name: "Budi Santoso", norm: "RM-2023-001" },
            { id: "002", name: "Siti Aminah", norm: "RM-2023-002" },
            { id: "003", name: "Andi Wijaya", norm: "RM-2023-003" },
        ]);
    };
    return (
        <Box sx={{ p: { xs: 1, md: 2 }, backgroundColor: "#f4f6f8", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", width: "100%", maxWidth: "1800px" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Box sx={{ p: 1, backgroundColor: "#1976d2", borderRadius: 1.5, display: "flex", mr: 2 }}>
                            <AccountBoxIcon sx={{ color: "#fff", fontSize: 24 }} />
                        </Box>
                        <Typography variant="h6" fontWeight="800" sx={{ color: "#2c3e50" }}>
                            Pemeriksaan Pasien
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3, alignItems: "flex-start" }}>
                        {/* SISI KIRI: LIST PASIEN */}
                        <Box sx={{ flex: { xs: "1 1 100%", lg: "0 0 380px" }, width: "100%" }}>
                            <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
                                <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                    <Typography variant="subtitle1" fontWeight="700">
                                        Antrean Pasien ({dataPasien.length})
                                    </Typography>
                                </Box>
                                <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    {dataPasien.length > 0 ? (
                                        <PatientList
                                            patients={dataPasien}
                                            onPatientClick={handleSelectPatient}
                                            onReload={handleReloadData} // Pasang fungsi reload di sini
                                        />
                                    ) : (
                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="body2" color="textSecondary">
                                                Tidak ada pasien dalam antrean
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Paper>
                        </Box>

                        {/* SISI KANAN: AREA DETAIL */}
                        <Box sx={{ flex: "1 1 auto", width: "100%", minWidth: 0 }}>
                            <Paper sx={{ p: 4, borderRadius: 3, border: '2px dashed #e2e8f0', bgcolor: '#f8fafc', textAlign: 'center' }}>
                                {lastSelected ? (
                                    <Typography variant="h6" color="primary">
                                        Memproses Pemeriksaan: {lastSelected.name}
                                    </Typography>
                                ) : (
                                    <Typography color="textSecondary">
                                        Pilih pasien untuk memulai pemeriksaan
                                    </Typography>
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}