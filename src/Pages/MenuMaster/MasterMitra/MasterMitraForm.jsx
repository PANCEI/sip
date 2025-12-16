import { FormControl, TextField, Stack, CircularProgress, Box, Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function MasterMitranForm ({ onSubmit , initialData}){
    const [token] = useLocalStorageEncrypt("token", null);
    // Mengubah default state menjadi true agar loading spinner muncul saat pertama kali dimuat
    const [loading , setLoading] = useState(true); 
    
    const {
        control, handleSubmit, reset, formState:{errors}
    } = useForm({
        defaultValues:{
            kode_mitra:"",
            nama_mitra:"",
            alamat:"",
            no_telepon:"",
            flag_delete:"",
        }
    });

    const getKodeMitra = async () =>{
        console.log("mendapatkan kode mitra");  
        setLoading(true); // Mulai loading saat memanggil API
        try{
        const {data , status} = await Api1(
            '/generate-kodeM',
            "GET",
            {},
            { Authorization: `Bearer ${token}` }
        );
        
        
        if (status === 200) {
            console.log("Kode Mitra Hasil API:", data);
            // Perbaikan 2: Isi field kode_mitra setelah berhasil mendapatkan data
            reset(prev => ({ 
                ...prev, 
                kode_mitra: data.data,
                flag_delete: "tidak", // Set default flag_delete untuk data baru
            }));
        }
        
        }catch(error){
            console.error('gagal mendapatkan kode mitra:', error);
        }finally{
            setLoading(false); // Akhiri loading, terlepas dari sukses/gagal
        }
    }

    useEffect(()=>{
        const fetchData= async ()=>{
            if(initialData){
                console.log("Mode Edit - Mengisi form dengan data awal:", initialData);
                // Perbaikan 3: Mode Edit - Reset dengan data yang ada
                reset({
                    kode_mitra:initialData.kode_mitra || "",
                    nama_mitra:initialData.nama_mitra || "",
                    alamat:initialData.alamat || "",
                    no_telepon:initialData.no_telepon || "",
                    // Perbaikan 4: Memastikan field flag_delete di-reset dengan nilai yang benar
                    flag_delete:initialData.flag_delete || "", 
                });
                // Hapus pemanggilan getKodeMitra di sini, karena kode mitra sudah ada di initialData
                setLoading(false); 
            }else{
                // Perbaikan 1: Mode Buat Baru - Panggil getKodeMitra untuk generate kode baru
                await getKodeMitra();
            }
        };
        fetchData();
    // Tambahkan 'reset' ke dependency array untuk menghilangkan warning (meskipun umumnya aman)
    },[initialData, reset]); 

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }
    
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={3}>
                <FormControl fullWidth>
                    <Controller
                    name="kode_mitra"
                    control={control}
                    rules={{
                        required:"Kode Mitra harus Di Isi"
                    }}
                    render={({field})=>(
                        <TextField
                        {...field}
                        label="Kode Mitra"
                        variant="outlined"
                        fullWidth
                        disabled // Kode Mitra biasanya di-disable di mode edit
                        error={!!errors.kode_mitra}
                        helperText={errors.kode_mitra?.message || ""} 
                        />
                    )}
                    />
                </FormControl>
                
                {/* Field Nama Mitra */}
                <FormControl fullWidth>
                    <Controller
                    name="nama_mitra"
                    control={control}
                    rules={{ required: "Nama Mitra harus Di Isi" }}
                    render={({field})=>(
                        <TextField
                        {...field}
                        label="Nama Mitra"
                        variant="outlined"
                        fullWidth
                        error={!!errors.nama_mitra}
                        helperText={errors.nama_mitra?.message || ""}
                        />
                    )}
                    />
                </FormControl>

                {/* Field Alamat */}
                <FormControl fullWidth>
                    <Controller
                    name="alamat"
                    control={control}
                    rules={{ required: "Alamat harus Di Isi" }}
                    render={({field})=>(
                        <TextField
                        {...field}
                        label="Alamat"
                        variant="outlined"
                        fullWidth
                        error={!!errors.alamat}
                        helperText={errors.alamat?.message || ""}
                        />
                    )}
                    />
                </FormControl>

                {/* Field No Telepon */}
                <FormControl fullWidth>
                    <Controller
                    name="no_telepon"
                    control={control}
                    rules={{ required: "No Telepon harus Di Isi" }}
                    render={({field})=>(
                        <TextField
                        {...field}
                        label="No Telepon"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        error={!!errors.no_telepon}
                        helperText={errors.no_telepon?.message || ""}
                        />
                    )}
                    />
                </FormControl>

                {/* Submit button bisa ditambahkan di sini */}
                <button type="submit" style={{ padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Simpan
                </button>

            </Stack>
        </form> 
    );
}