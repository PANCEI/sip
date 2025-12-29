import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FormControl, TextField, Box, Typography, Paper, 
    CircularProgress, Autocomplete, InputAdornment, Button
} from "@mui/material";
import { 
    Fingerprint, MedicalServices, Numbers, 
    Description, CalendarMonth, Save 
} from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function FormCheckUp() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [doctorOptions, setDoctorOptions] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(false);
    const [doctorInput, setDoctorInput] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token] = useLocalStorageEncrypt('token', null);

    const today = new Date().toISOString().split('T')[0];

    const { control, handleSubmit, reset, formState: { errors }, watch } = useForm({
        defaultValues: {
            nama_pasien: "", 
            nama_dokter: "", 
            sistolik: "",
            diastolik: "",
            tanggal: today,
            keterangan: ""
        }
    });

    const watchSistolik = watch("sistolik");

    useEffect(() => {
        reset((formValues) => ({
            ...formValues,
            tanggal: today
        }));
    }, [today, reset]);

    // Fetch Pasien
    useEffect(() => {
        if (inputValue.length < 2) { setOptions([]); return; }
        const getData = setTimeout(async () => {
            setLoading(true);
            try {
                const { data, status } = await Api1(`/get-pasien-check?search=${inputValue}`, 'GET', {}, {
                    Authorization: `Bearer ${token}`
                });
                if (status === 200) setOptions(data);
            } catch (error) { setOptions([]); } finally { setLoading(false); }
        }, 500);
        return () => clearTimeout(getData);
    }, [inputValue, token]);

    // Fetch Dokter
    useEffect(() => {
        if (doctorInput.length < 2) { setDoctorOptions([]); return; }
        const timer = setTimeout(async () => {
            setDoctorLoading(true);
            try {
                const { data, status } = await Api1(`/get-dokter?search=${doctorInput}`, 'GET', {}, {
                    Authorization: `Bearer ${token}`
                });
                if (status === 200) setDoctorOptions(data);
            } catch (error) { setDoctorOptions([]); } finally { setDoctorLoading(false); }
        }, 500);
        return () => clearTimeout(timer);
    }, [doctorInput, token]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log("Payload:", data);
            alert("Data berhasil disimpan!");
            reset({
                nama_pasien: "", 
                nama_dokter: "", 
                sistolik: "",
                diastolik: "",
                tanggal: today,
                keterangan: ""
            });

            // 3. Reset State Lokal Autocomplete agar tampilan input bersih
            setSelectedPatient(null);
            setSelectedDoctor(null);
            setInputValue("");
            setDoctorInput("");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "flex-start" }}>
            <Paper elevation={3} sx={{ width: "100%", maxWidth: 900, p: 5, borderRadius: 2 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
                        Pemeriksaan Pasien
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <FormControl fullWidth>
                            <Controller
                                name="nama_pasien"
                                control={control}
                                rules={{ required: "Pasien harus dipilih" }}
                                render={({ field: { onChange } }) => (
                                    <Autocomplete
                                        options={options}
                                        loading={loading}
                                        value={selectedPatient}
                                        isOptionEqualToValue={(option, value) => option.no_rm === value?.no_rm}
                                        onInputChange={(_, val, reason) => { if (reason === 'input') setInputValue(val); }}
                                        onChange={(_, newValue) => {
                                            setSelectedPatient(newValue);
                                            onChange(newValue ? newValue.no_rm : "");
                                        }}
                                        getOptionLabel={(opt) => opt ? `${opt.no_rm} - ${opt.nama_pasien}` : ""}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                label="Cari Pasien" 
                                                error={!!errors.nama_pasien} 
                                                helperText={errors.nama_pasien?.message} 
                                                // MENGGUNAKAN slotProps AGAR TIDAK TERCORET
                                                slotProps={{
                                                    input: {
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                            <>
                                                                <InputAdornment position="start"><Fingerprint color="primary" /></InputAdornment>
                                                                {params.InputProps.startAdornment}
                                                            </>
                                                        )
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <Controller
                                name="nama_dokter"
                                control={control}
                                rules={{ required: "Dokter harus dipilih" }}
                                render={({ field: { onChange } }) => (
                                    <Autocomplete
                                        options={doctorOptions}
                                        loading={doctorLoading}
                                        value={selectedDoctor}
                                        // Pastikan perbandingan menggunakan id_dokter sesuai API Anda
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        onInputChange={(_, val, reason) => { if (reason === 'input') setDoctorInput(val); }}
                                        onChange={(_, newValue) => {
                                            setSelectedDoctor(newValue);
                                            onChange(newValue ? newValue.id : "");
                                        }}
                                        getOptionLabel={(opt) => opt ? `${opt.kode_dokter} - ${opt.nama_dokter}` : ""}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                label="Cari Dokter" 
                                                error={!!errors.nama_dokter} 
                                                helperText={errors.nama_dokter?.message} 
                                                slotProps={{
                                                    input: {
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                            <>
                                                                <InputAdornment position="start"><MedicalServices color="secondary" /></InputAdornment>
                                                                {params.InputProps.startAdornment}
                                                            </>
                                                        )
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="sistolik"
                                control={control}
                                rules={{ required: "Sistolik wajib diisi" }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="number"
                                        label="Sistolik (mmHg)"
                                        error={!!error}
                                        helperText={error?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start"><Numbers color="primary" /></InputAdornment>
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="diastolik"
                                control={control}
                                rules={{ 
                                    required: "Diastolik wajib diisi",
                                    validate: (value) => !watchSistolik || parseInt(value) < parseInt(watchSistolik) || "Diastolik harus lebih rendah dari Sistolik"
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="number"
                                        label="Diastolik (mmHg)"
                                        error={!!error}
                                        helperText={error?.message}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start"><Numbers color="primary" /></InputAdornment>
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="tanggal"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value || today}
                                        fullWidth
                                        disabled
                                        label="Tanggal"
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                            input: {
                                                startAdornment: <InputAdornment position="start"><CalendarMonth color="action" /></InputAdornment>
                                            }
                                        }}
                                        sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#555" } }}
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Controller
                            name="keterangan"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Keterangan / Catatan Medis"
                                    placeholder="Tuliskan detail pemeriksaan atau keluhan pasien di sini..."
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                                    <Description color="primary" />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            )}
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
                            sx={{ px: 6, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                        >
                            {isSubmitting ? "Menyimpan..." : "Simpan Data"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}