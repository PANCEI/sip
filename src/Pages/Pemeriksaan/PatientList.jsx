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
    Tooltip
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function PatientList({ patients, onPatientClick, onReload }) {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Bagian Header List dengan tombol Reload */}
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
                        onClick={onReload}
                        sx={{ color: '#1976d2' }}
                    >
                        <RefreshIcon fontSize="small" />
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
                                    primary={patient.name} 
                                    secondary={patient.norm || `No. RM: ${patient.id}`}
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