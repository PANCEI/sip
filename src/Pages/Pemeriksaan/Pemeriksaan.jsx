import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Typography, Paper, Box } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PatientList from "./PatientList";
import InfoPasien from "./InfoPasien";
import FormPemeriksaan from "./FormPemeriksaan";
import { useLocalStorageEncrypt } from "../../helper/CostumHook";
import { Api1 } from "../../utils/Api1";

export default function Pemeriksaan() {
    const [token] = useLocalStorageEncrypt('token', null);
    const [user] = useLocalStorageEncrypt('user', null);
    const [dataPasien, setDataPasien] = useState([]);
    const [lastSelected, setLastSelected] = useState(null);

    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: { diagnosa: "", obat: [{ nama_obat: "", dosis: "", id_obat: "" }] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "obat" });

    const getDataPasien = async () => {
        try {
            const { data, status } = await Api1('/pasien-today', 'GET', user, {
                Authorization: `Bearer ${token}`,
            });
            if (status === 200) setDataPasien(data.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { getDataPasien(); }, [token]);

    const handleSelectPatient = (patient) => {
        setLastSelected(patient);
        reset({ diagnosa: "", obat: [{ nama_obat: "", dosis: "", id_obat: "" }] });
        // Hapus dari list antrean
        setDataPasien((prev) => prev.filter((item) => item.id !== patient.id));
    };

    const onSubmit = (formData) => {
        console.log("Payload ke API:", { rekam_medis: formData, pasien: lastSelected });
        alert("Data Berhasil Disimpan");
        setLastSelected(null);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                <Box sx={{ p: 1, bgcolor: "#1976d2", borderRadius: 1.5, display: "flex" }}>
                    <AccountBoxIcon sx={{ color: "#fff" }} />
                </Box>
                <Typography variant="h6" fontWeight="800">
                    {lastSelected ? `Pemeriksaan: ${lastSelected.pasien.nama_pasien}` : "Antrean Pemeriksaan"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
                <Box sx={{ width: "320px", flexShrink: 0 }}>
                    <Paper sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #e0e6ed" }}>
                        <Box sx={{ p: 2, bgcolor: "#fff", borderBottom: "1px solid #e0e6ed" }}>
                            <Typography variant="subtitle2" fontWeight="700">Antrean</Typography>
                        </Box>
                        <PatientList patients={dataPasien} onPatientClick={handleSelectPatient} onReload={getDataPasien} />
                    </Paper>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    {lastSelected ? (
                        <Box key={lastSelected.id} sx={{ display: "flex", gap: 3, animation: "slideInRight 0.4s ease-out" }}>
                            <Box sx={{ flex: "1 1 350px" }}>
                                <InfoPasien patient={lastSelected} />
                            </Box>
                            <Paper sx={{ flex: "2 1 600px", p: 4, borderRadius: 3, border: "1px solid #e0e6ed" }}>
                                <FormPemeriksaan 
                                    register={register} control={control} fields={fields} append={append} 
                                    remove={remove} handleSubmit={handleSubmit} onSubmit={onSubmit} 
                                    errors={errors} setValue={setValue} token={token} user={user}
                                />
                            </Paper>
                        </Box>
                    ) : (
                        <Paper sx={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center", border: "2px dashed #cbd5e1", bgcolor: "transparent" }}>
                            <Typography color="textSecondary">Pilih pasien untuk memulai</Typography>
                        </Paper>
                    )}
                </Box>
            </Box>

            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </Box>
    );
}