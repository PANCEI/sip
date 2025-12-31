import { useState } from "react"; // Tambahkan useState
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    IconButton,
    Typography,
    Tooltip,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function PatientList({ patients, onPatientClick, onReload }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleReloadInternal = async () => {
        setIsRefreshing(true);
        
        // Menjalankan fungsi reload dari props
        // Jika onReload adalah fungsi async, kita tunggu hingga selesai
        await onReload();

        // Berikan sedikit delay agar animasi terlihat halus sebelum berhenti
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box 
                sx={{ 
                    px: 2, 
                    py: 1, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    bgcolor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0'
                }}
            >
                <Typography variant="caption" fontWeight="700" color="textSecondary">
                    {patients.length} PASIEN TERSEDIA
                </Typography>
                
                <Tooltip title="Reload Data">
                    <IconButton 
                        size="small" 
                        onClick={handleReloadInternal}
                        disabled={isRefreshing}
                        sx={{ color: '#1976d2' }}
                    >
                        <RefreshIcon 
                            fontSize="small" 
                            sx={{ 
                                // Animasi putar
                                animation: isRefreshing ? "spin 1s linear infinite" : "none",
                                "@keyframes spin": {
                                    "0%": { transform: "rotate(0deg)" },
                                    "100%": { transform: "rotate(360deg)" }
                                }
                            }} 
                        />
                    </IconButton>
                </Tooltip>
            </Box>

            <List sx={{ p: 0 }}>
                {patients.map((patient, index) => (
                    <Box key={patient.id}>
                        <ListItem disablePadding>
                            <ListItemButton 
                                onClick={() => onPatientClick(patient)}
                                sx={{ 
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#f0f7ff' } 
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <PersonIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={patient.pasien.nama_pasien} 
                                    secondary={patient.pasien.no_rm || `No. RM: ${patient.id}`}
                                    primaryTypographyProps={{ 
                                        fontWeight: '600', 
                                        color: '#334155',
                                        variant: 'body2' 
                                    }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                />
                                <ChevronRightIcon sx={{ color: '#cbd5e1', fontSize: 20 }} />
                            </ListItemButton>
                        </ListItem>
                        {index < patients.length - 1 && <Divider component="li" />}
                    </Box>
                ))}
            </List>
        </Box>
    );
}