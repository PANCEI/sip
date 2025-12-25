import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Toast } from "../../components/Toast";
export default function CheckUp() {
    const [activeTab, setActiveTab] = useState(1);
    const [token] = useLocalStorageEncrypt("token", null);
    const ShowToast= Toast();
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  return (
    <>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: "#f4f6f8",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center", // Pusatkan Card secara horizontal
          alignItems: "flex-start"   // Mulai dari atas
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "80%", // Membatasi lebar agar tidak terlalu meluas (ruang kosong berkurang)
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#1976d2",
                  borderRadius: 1.5,
                  display: "flex",
                  mr: 2,
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)"
                }}
              >
                <AccountBoxIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="800" sx={{ color: "#2c3e50" }}>
                  Check Up
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Manajemen Pasien Dan Check Up
                </Typography>
              </Box>
            </Box>
             <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{
                          mb: 3,
                          borderBottom: 1,
                          borderColor: "divider",
                          "& .MuiTab-root": { 
                            fontWeight: "bold", 
                            fontSize: "13px",
                            minWidth: "120px" 
                          },
                        }}
                      >
                        <Tab label="DATA Master Pasien" />
                        <Tab label="Check Up" />
                      </Tabs>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
