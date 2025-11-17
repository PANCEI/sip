import { FormControl, TextField, Stack , CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
export default function SatuanObatForm({ onSubmit, initialData }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
        id: null,
        satuan: "",
    },
  });
//   use efefect untuk tangani form
useEffect(()=>{
    if(initialData){
        reset({
            id: initialData.id,
            satuan: initialData.satuan,
        });
    }else{
        reset({
            id: null,
            satuan: "",
        });
    }   
}, [initialData, reset]);
const handleFormSubmit = (data) => {
    const formattedData = {
        id: data.id,
        satuan: data.satuan,
    };
    onSubmit(formattedData);    
};
return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
        <FormControl fullWidth>
            <Controller
                name="satuan"
                control={control}
                rules={{ required: "Nama Satuan wajib diisi" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nama Satuan"
                        variant="outlined"
                        fullWidth
                        error={!!errors.satuan}
                        helperText={errors.satuan?.message || ""}
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
);

}