import { Paper, Typography, Divider, Box, Chip } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
export default function InfoPasien({ patient }) {
    if (!patient) return null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                <Typography variant="caption" fontWeight="700" color="primary" sx={{ display: 'block', mb: 1 }}>DATA PASIEN AKTIF</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="caption" color="textSecondary">Nama Lengkap</Typography>
                <Typography variant="body2" fontWeight="700" sx={{ mb: 2 }}>{patient.pasien.nama_pasien}</Typography>
                
                <Typography variant="caption" color="textSecondary">No. Rekam Medis</Typography>
                <Typography variant="body2" fontWeight="700" sx={{ mb: 2 }}>{patient.pasien.no_rm}</Typography>

                <Typography variant="caption" color="textSecondary">Vital Sign</Typography>
                <Box sx={{ mb: 2, mt: 0.5 }}>
                    <Chip label={`TD: ${patient.sistolik}/${patient.diastolik}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                </Box>

                <Typography variant="caption" color="textSecondary">Keluhan Utama</Typography>
                <Box sx={{ p: 1.5, bgcolor: "#fffde7", borderRadius: 2, border: "1px solid #fff59d", mt: 0.5 }}>
                    <Typography variant="body2">"{patient.keluhan}"</Typography>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <HistoryIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" fontWeight="700">Riwayat Terakhir</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="caption" color="primary" fontWeight="700">Terakhir: 01 Jan 2026</Typography>
                <Typography variant="body2" fontWeight="700">Diagnosa: Influenza</Typography>
            </Paper>
        </Box>
    );
}