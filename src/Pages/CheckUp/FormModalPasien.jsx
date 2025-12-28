import { 
  FormControl, 
  TextField, 
  Stack, 
  CircularProgress, 
  Box, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormHelperText 
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
export default function FormModalPasien ({onSubmit , initialData}){
    const {control , handleSubmit ,reset, formState: { errors }  } = useForm({
      defaultValues:{
        id:"",
        no_rm:"",
        nama_pasien:"",
        alamat:"",
        tgl_lahir:"",
        deskripsi:""
      }
    })
useEffect(()=>{
  if(initialData){
    reset({
      id:initialData.id,
      nama_pasien:initialData.nama_pasien,
      no_rm:initialData.nama_pasien,
      alamat:initialData.alamat,
      tgl_lahir:initialData.tanggal_lahir,
      deskripsi:initialData.deskripsi
    })
  }
},[initialData])
return (
  <>
  <form onSubmit={handleSubmit(onSubmit)}>
  <Stack spacing={3} sx={{mt:1}}>
  <FormControl fullWidth>
  
  </FormControl>
  </Stack>

  </form>
  </>
);

}
