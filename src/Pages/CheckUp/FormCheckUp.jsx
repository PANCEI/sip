import { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    FormControl, TextField, Box, Typography, Paper, CircularProgress, Autocomplete, InputAdornment
} from "@mui/material";
import { Fingerprint, MedicalServices } from "@mui/icons-material";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function FormCheckUp() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // State tambahan untuk menyimpan objek pasien yang sedang dipilih
    const [selectedPatient, setSelectedPatient] = useState(null);

    // State Dokter
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(false);
    const [doctorInput, setDoctorInput] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [token] = useLocalStorageEncrypt('token', null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nama_pasien: "",
            nama_dokter: ""  // Menyimpan id_dokter atau kode_dokter

        }
    });

    useEffect(() => {
        // HANYA ambil data jika user sedang mengetik (bukan saat memilih dari list)
        if (inputValue.length < 2) {
            setOptions([]);
            return;
        }

        const getData = setTimeout(async () => {
            setLoading(true);
            try {
                const { data, status } = await Api1(`/get-pasien-check?search=${inputValue}`, 'GET', {}, {
                    Authorization: `Bearer ${token}`
                });
                if (status === 200) {
                    setOptions(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(getData);
    }, [inputValue, token]);
    // EFFECT: Cari Dokter
    useEffect(() => {
        if (doctorInput.length < 2) {
            setDoctorOptions([]);
            return;
        }
        const timer = setTimeout(async () => {
            setDoctorLoading(true);
            try {
                // Pastikan endpoint API dokter sudah sesuai
                const { data, status } = await Api1(`/get-dokter?search=${doctorInput}`, 'GET', {}, {
                    Authorization: `Bearer ${token}`
                });
                if (status === 200) setDoctorOptions(data);
            } catch (error) {
                setDoctorOptions([]);
            } finally {
                setDoctorLoading(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [doctorInput, token]);
    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 1 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#2c3e50" }}>
                        Pemeriksaan Pasien
                    </Typography>
                </Box>

                <form>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                        <FormControl fullWidth>
                            <Controller
                                name="nama_pasien"
                                control={control}
                                rules={{ required: "Pasien harus dipilih" }}
                                render={({ field: { onChange } }) => (
                                    <Autocomplete
                                        options={options}
                                        loading={loading}
                                        // Gunakan state selectedPatient agar label tetap muncul
                                        value={selectedPatient}
                                        onInputChange={(event, newInputValue, reason) => {
                                            // Mencegah API terpanggil ulang saat item dipilih (reason: 'reset')
                                            if (reason === 'input') {
                                                setInputValue(newInputValue);
                                            }
                                        }}
                                        onChange={(_, newValue) => {
                                            // Simpan objek lengkap ke state lokal untuk tampilan
                                            console.log(newValue);
                                            setSelectedPatient(newValue);
                                            // Simpan no_rm ke react-hook-form
                                            onChange(newValue ? newValue.no_rm : "");
                                        }}
                                        getOptionLabel={(option) =>
                                            option ? `${option.no_rm} - ${option.nama_pasien}` : ""
                                        }
                                        isOptionEqualToValue={(option, value) => option.no_rm === value.no_rm}
                                        filterOptions={(x) => x} // Data sudah difilter oleh API
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Cari No. RM / Nama Pasien"
                                                error={!!errors.nama_pasien}
                                                helperText={errors.nama_pasien?.message}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment position="start">
                                                                <Fingerprint color="primary" />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                    endAdornment: (
                                                        <>
                                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
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
                                        onInputChange={(_, val, reason) => {
                                            if (reason === 'input') setDoctorInput(val);
                                        }}
                                        onChange={(_, newValue) => {
                                            setSelectedDoctor(newValue);
                                            // Asumsi API dokter mengembalikan id_dokter
                                            onChange(newValue ? newValue.id_dokter : "");
                                        }}
                                        getOptionLabel={(opt) => opt ? `${opt.kode_dokter} - ${opt.nama_dokter}` : ""}
                                        isOptionEqualToValue={(opt, val) => opt.id_dokter === val.id_dokter}
                                        filterOptions={(x) => x}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Cari Nama Dokter"
                                                error={!!errors.nama_dokter}
                                                helperText={errors.nama_dokter?.message}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment position="start"><MedicalServices color="secondary" /></InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                    endAdornment: (
                                                        <>
                                                            {doctorLoading ? <CircularProgress size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </FormControl>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}