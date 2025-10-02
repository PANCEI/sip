import { useEffect } from "react";
import { Stack , FormControl, TextField,Select, MenuItem, InputLabel, Button , FormHelperText } from "@mui/material";
import { useForm , Controller } from "react-hook-form";
useForm
import { useState } from "react";
export default function SubMenuForm({onSubmit , initialData , masterMenu}){
  const [masterMenus , setMasterMenus] =useState([]);
const {handleSubmit, control ,formState:{errors} , reset } = useForm({
   defaultValues:{
     id_sub_menu:null,
    nama_sub_menu:"",
    url:"",
    path:"",
    id_menu:"",
    icon :"",
    sub:""
   }
});
useEffect(()=>{
  setMasterMenus(masterMenu);
    if(initialData){
        reset({
          id_sub_menu:initialData.id,
          nama_sub_menu:initialData.nama_sub_menu,
          url:initialData.url,
          path:initialData.path,
          id_menu:initialData.id_menu, 
          icon:initialData.icon, 
          sub:initialData.sub
        })
    }else{
      reset({
        id_sub_menu:null,
        nama_sub_menu:"",
        url:"",
        path:"",
        id_menu:"",
      icon:"",
      sub:""
      })
    }
}, [initialData, reset])
const handleFormSimpan= (data) =>{
  const formatData={
    id:data.id_sub_menu,
    nama_sub_menu:data.nama_sub_menu,
    url:data.url,
    path:data.path,
    id_menu:data.id_menu,
    icon:data.icon,
    sub:data.sub
  };
  onSubmit(formatData);
};
console.log(masterMenu)
console.log(masterMenus)
//console.log(initialData)
return (
  <form onSubmit={handleSubmit(handleFormSimpan)}>
    <Stack spacing={3}>
      <FormControl fullWidth>
      <Controller
          name="nama_sub_menu"
          control={control}
          rules={{
            required: "Nama Sub Menu wajib diisi"
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nama Sub Menu"
              variant="outlined"
              fullWidth
              error={!!errors.nama_sub_menu}
              helperText={errors.nama_sub_menu ? errors.nama_sub_menu.message : ""}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth  >
      <Controller
          name="url"
          control={control}
          rules={{
            required:"url wajib di isi"
          }}
            render={({field})=>(
              <TextField
            {...field}
            label="Url"
            variant="outlined"
            fullWidth
            error={!!errors.url}
            helperText={errors.url ?errors.url.message:""}

            />
      )}
      />
      </FormControl>
    {/* path */}
    <FormControl fullWidth>
      <Controller
      name="path"
      control={control}
      rules={{
        required:"Path Wajib Di Isi"
      }}
      render={({field})=>(
        <TextField
        {...field}
        label="Path"
        variant="outlined"
        fullWidth
        error={!!errors.path}
        helperText={errors.path?errors.path.message:""}
        />
      )}
      />
    </FormControl>
    {/* id_menu */}
    <FormControl fullWidth>
          <InputLabel id="id-menu">Menu Parent</InputLabel>
      <Controller
      name="id_menu"
      control={control}
      rules={{
        required:"Menu Parent Wajib Di Pilih"
      }}
      render={({field})=>(
        <Select
        {...field}
        labelId="id-menu"
        id="id_menu"
        label="Menu Parent"
        >
          <MenuItem value="">
          <em>none</em>
          </MenuItem>
          {masterMenus.map((master) =>(
            <MenuItem key={master.id} value={master.id} >{master.menu}</MenuItem>
          ))}
        
        </Select>
      )}
      />
    </FormControl>
    </Stack>
  </form>
)

}
