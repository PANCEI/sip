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
import MasterPasien from "./MasterPasien";

export default function CheckUp() {
  const [activeTab, setActiveTab] = useState(0); // Default ke tab pertama (indeks 0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        p: { xs: 1, md: 2 }, // Perkecil padding Box luar
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
          // PENTING: Jangan gunakan 90%, gunakan 100% atau maxWidth yang sangat lebar
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
            }}
          >
            <Tab label="DATA Master Pasien" />
            <Tab label="Check Up" />
          </Tabs>

          {/* Render konten berdasarkan tab */}
          {activeTab === 0 ? (
            <Box sx={{ width: "100%" }}>
              <MasterPasien />
            </Box>
          ) : (
            <Box sx={{ p: 4 }}>
              <Typography>Konten Check Up</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}