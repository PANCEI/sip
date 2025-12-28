import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FormControl, TextField, Box, Select, MenuItem,
    InputLabel, Button, Divider, InputAdornment, FormHelperText, Typography, Paper, CircularProgress
} from "@mui/material";
export default function FormCheckUp() {
    return (
        <>
            <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
                <Paper elevation={2} sx={{ width: "100%", p: 5, borderRadius: 1 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
                            Pemeriksaan Pasien
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                            Pastikan data yang dimasukkan sesuai Keadaan Pasien.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}