import { FormControl, TextField, Stack , CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
export default function KategoriObatForm({ onSubmit, initialData }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
        id: null,
        nama_kategori: "",
        deskripsi: "",
    },
  });
//   use efefect untuk tangani form
useEffect(()=>{
    if(initialData){
        reset({
            id: initialData.id,
            nama_kategori: initialData.nama_kategori,
            deskripsi: initialData.deskripsi,
        });
    }else{
        reset({
            id: null,
            nama_kategori: "",
            deskripsi: "",
        });
    }
}, [initialData, reset]);
const handleFormSubmit = (data) => {
    const formattedData = {
        id: data.id,
        nama_kategori: data.nama_kategori,
        deskripsi: data.deskripsi,
    };
    onSubmit(formattedData);   
};
return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}> 
        <FormControl fullWidth>
            <Controller
                name="nama_kategori"
                control={control}
                rules={{ required: "Nama Kategori wajib diisi" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nama Kategori"
                        variant="outlined"
                        fullWidth
                        error={!!errors.nama_kategori}
                        helperText={errors.nama_kategori?.message || ""}
                    />  
                )}
            />
        </FormControl>
        <FormControl fullWidth>
            <Controller
                name="deskripsi"
                control={control}
                rules={{ required: "Nama Deskripsi wajib diisi" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Deskripsi"
                        variant="outlined"
                        fullWidth
                        error={!!errors.deskripsi}
                        helperText={errors.deskripsi?.message || ""}
                    />  
                )}
            />
        </FormControl>
         <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
         {initialData ?"Update" :"Simpan"}
        </button>
        </Stack>
    </form>
)
}