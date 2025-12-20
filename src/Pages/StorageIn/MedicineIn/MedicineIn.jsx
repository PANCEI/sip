import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Inventory,
  Medication,
  Numbers,
  CalendarToday,
  Save,
  Category,
  Store,
  Assignment,
} from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import MedicineForm from "./MedicineForm";
export default function MedicineIn() {
  const [activeTab, setActiveTab] = useState(1);
    const [user] = useLocalStorageEncrypt("user", null);
    console.log("User Info:", user);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  }
  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ p: 0.5, backgroundColor: "#1976d2", borderRadius: 1, display: "flex", mr: 2 }}>
              <Inventory sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Typography variant="h6" fontWeight="bold">Medicine In</Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": { fontWeight: "bold", fontSize: "12px" },
            }}
          >
            <Tab label="SHOW DATA" />
            <Tab label="ADD MEDICINE" />
          </Tabs>

          {/* Form Content */}
          {activeTab === 1 && (
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", // Memastikan seluruh blok form di tengah
                width: "100%",
                mt: 2,
                mb: 5
              }}
            >
             <MedicineForm onSubmit={handleFormSubmit}/>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}