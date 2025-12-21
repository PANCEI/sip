import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Inventory } from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import MedicineForm from "./MedicineForm";
import MadicineTable from "./MedicineTable";
import { Toast } from "../../../components/Toast";
//import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
export default function MedicineIn() {
  const [activeTab, setActiveTab] = useState(1);
  const [token] = useLocalStorageEncrypt("token", null);
  const ShowToast= Toast();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFormSubmit = (form) => {
    console.log("Form Data Submitted:", form);
    try{
      const {data , status} = Api1('/add-medicine-in', "POST", form, { Authorization: `Bearer ${token}` });
      if(status === 200){
         ShowToast("success", "Data berhasil disimpan");
        console.log("Data successfully submitted:", data);
      }
    }catch(error){
      console.error("Error submitting form data:", error);
    }
  };

  return (
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
          maxWidth: "70%", // Membatasi lebar agar tidak terlalu meluas (ruang kosong berkurang)
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Header */}
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
              <Inventory sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="800" sx={{ color: "#2c3e50" }}>
                Obat Masuk
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Manajemen stok masuk gudang farmasi
              </Typography>
            </Box>
          </Box>

          {/* Tabs */}
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
            <Tab label="DATA OBAT MASUK" />
            <Tab label="TAMBAH OBAT" />
          </Tabs>

          {/* Form Content */}
          {activeTab === 1 ? (
            <Box 
              sx={{ 
                width: "100%",
                mt: 1,
                // Hilangkan paksaan alignItems center jika MedicineForm sudah rapi
              }}
            >
              <MedicineForm onSubmit={handleFormSubmit} />
            </Box>
          ):(
            <MadicineTable/>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}