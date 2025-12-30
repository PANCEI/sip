import {
    Card,
    CardContent,
    Typography,
    Paper,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person'; // Tambahan icon untuk estetika

export default function Pemeriksaan() {
    // Contoh data pasien
    const patients = [
        { id: 1, name: "Budi Santoso", age: 45 },
        { id: 2, name: "Siti Aminah", age: 30 },
        { id: 3, name: "Andi Wijaya", age: 28 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
        { id: 4, name: "Dewi Lestari", age: 35 },
    ];

    const handlePatientClick = (patient) => {
        console.log("Memilih pasien:", patient.name);
        // Tambahkan logika Anda di sini (misal: set state untuk menampilkan detail di sisi kanan)
    };

    return (
        <Box
            sx={{
                p: { xs: 1, md: 2 },
                backgroundColor: "#f4f6f8",
                display: "flex",
                justifyContent: "center",
                
            }}
        >
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    width: "100%",
                    maxWidth: "1800px",
                }}
            >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Box
                            sx={{
                                p: 1,
                                backgroundColor: "#1976d2",
                                borderRadius: 1.5,
                                display: "flex",
                                mr: 2,
                            }}
                        >
                            <AccountBoxIcon sx={{ color: "#fff", fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="800" sx={{ color: "#2c3e50" }}>
                                Pemeriksaan Pasien
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", lg: "row" },
                                gap: 3,
                                alignItems: "flex-start"
                            }}
                        >
                            {/* SISI KIRI: LIST PASIEN */}
                            <Box sx={{ flex: { xs: "1 1 100%", lg: "0 0 380px" }, width: "100%" }}>
                                <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
                                    <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fff' }}>
                                        <Typography variant="h6" fontWeight="700">
                                            List Data Pasien
                                        </Typography>
                                    </Box>
                                    
                                    <List sx={{ p: 0, maxHeight: '600px', overflow: 'auto' }}>
                                        {patients.map((patient, index) => (
                                            <Box key={patient.id}>
                                                <ListItem disablePadding>
                                                    <ListItemButton 
                                                        onClick={() => handlePatientClick(patient)}
                                                        sx={{ py: 1.5 }}
                                                    >
                                                        <PersonIcon sx={{ mr: 2, color: '#94a3b8' }} />
                                                        <ListItemText 
                                                            primary={patient.name} 
                                                            secondary={`Usia: ${patient.age} tahun`}
                                                            primaryTypographyProps={{ fontWeight: '600', color: '#334155' }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                                {index < patients.length - 1 && <Divider />}
                                            </Box>
                                        ))}
                                    </List>
                                </Paper>
                            </Box>

                            {/* SISI KANAN: DETAIL PEMERIKSAAN */}
                            <Box sx={{ flex: "1 1 auto", width: "100%", minWidth: 0 }}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3, textAlign: 'center', color: '#94a3b8' }}>
                                    Pilih pasien di sebelah kiri untuk melihat detail pemeriksaan.
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}