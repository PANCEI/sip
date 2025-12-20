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
export default function MedicineIn() {
  const [activeTab, setActiveTab] = useState(1);
    const [user] = useLocalStorageEncrypt("user", null);
    console.log("User Info:", user);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
              {/* Container Form dengan Lebar Terkunci agar Rapi */}
              <Box sx={{ width: "100%", maxWidth: "900px" }}> 
                <Grid container spacing={3} mb={3}>
                     <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nama Obat"
                      placeholder="Input nama obat"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Medication fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                     <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nama Obat"
                      placeholder="Input nama obat"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Medication fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  {/* Baris 1 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nama Obat"
                      placeholder="Input nama obat"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Medication fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Kategori"
                      defaultValue=""
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Category fontSize="small" /></InputAdornment>,
                      }}
                    >
                      <MenuItem value="tablet">Tablet</MenuItem>
                      <MenuItem value="sirup">Sirup</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Baris 2 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Jumlah Masuk"
                      placeholder="#"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Numbers fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Supplier"
                      placeholder="Nama supplier"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Store fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>

                  {/* Baris 3 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Tanggal Masuk"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><CalendarToday fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nomor Batch"
                      placeholder="Input nomor batch"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Assignment fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
               

                {/* Footer Tombol Simpan */}
                <Box sx={{ mt: 5, width: "100%" }}>
                  <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                    <Button 
                      variant="outlined" 
                      sx={{ textTransform: 'none', fontWeight: 'bold', px: 4, borderRadius: 1.5, borderColor: '#dce0e4', color: '#637381' }}
                    >
                      Batal
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />}
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 'bold', 
                        px: 4, 
                        borderRadius: 1.5,
                        backgroundColor: '#1976d2'
                      }}
                    >
                      Simpan Data
                    </Button>
                  </Box>
                </Box>

              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}