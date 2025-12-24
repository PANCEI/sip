import { FormControl, TextField, Stack, CircularProgress, Box, Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller, Form } from "react-hook-form";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
export default function MasterDokterForm({onSubmit , initialData}){
    const [token] =useLocalStorageEncrypt('token', null);
    const [loading, setLoading] =useState(true);
    const [masterPoli , setMasterPoli] =useState([]);
 const {control, handleSubmit , reset , formState: { errors },}  = useForm({
    id:"",    
    kode_dokter:"",
    nama_dokter:"",
    id_poli:"",
    spesiais:"",
    no_sip:"",
    flag_delete:"",
    status_dokter:"",
 }) 
 
 const getSIpAndCode= async ()=>{
   
    try{
        const {data , status}= await Api1('/generate-kode-dokter', 'GET',{},{
            Authorization: `Bearer ${token}`
        });
        if(status ===200 && data.message=== 'berhasil'){
            reset((prev)=>({
                ...prev,
                kode_dokter:data.data.kode_dokter,
                no_sip:data.data.no_sip,
                flag_delete:0
            }))
        }
    }catch(err){
        console.log('api gagal', err);
    }finally{
       
    }
 }
 const getMasterPoli = async ()=>{
    try{
        const {data , status } = await Api1('/all-data-poli', 'GET', {},{
             Authorization: `Bearer ${token}`
        });
        if(status ===200 && data.message ==='berhasil'){
            setMasterPoli(data.data);
            console.log('data poli', data);
        }
    }catch(err){
        console.log('api gagal', err);
    }finally{
        setLoading(false);
    }
 }
  useEffect(()=>{
    const fetchData = async ()=>{
       if(initialData){
        reset({
            id:initialData.id,
            kode_dokter:initialData.kode_dokter,
            nama_dokter:initialData.nama_dokter,
            id_poli:initialData.id_poli,
            spesialis:initialData.spesialis,
            no_sip:initialData.no_sip,
            flag_delete:initialData.flag_delete,
            status_dokter:initialData.status_dokter
        })
        await getMasterPoli();
    }else{
        getSIpAndCode();
        getMasterPoli();
    } 
    };
    fetchData();
 }, [initialData])
if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }
//  useEffect(()=>{
//     getSIpAndCode();
//     getMasterPoli();
//  },[initialData]);
 return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3}>
    <FormControl>
        <Controller
        name="kode_dokter"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
            <TextField
            {...field}
            label="Kode Dokter"
            variant="outlined"
            fullWidth
            disabled
            error={!!errors.kode_dokter}
            helperText={errors.kode_dokter?.message||""}
            
            />
        )}
        />
    </FormControl>
    <FormControl>
        <Controller
        name="no_sip"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
            <TextField
            {...field}
            label="No Sip"
            variant="outlined"
            fullWidth
            disabled
            error={!!errors.no_sip}
            helperText={errors.no_sip?.message||""}
            
            />
        )}
        />
    </FormControl>
    <FormControl>
        <Controller
        name="nama_dokter"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
            <TextField
            {...field}
            label="Nama Dokter"
            variant="outlined"
            fullWidth
            
            error={!!errors.nama_dokter}
            helperText={errors.nama_dokter?.message||""}
            
            />
        )}
        />
    </FormControl>
    <FormControl>
         <InputLabel id="id-poli-label">Poli</InputLabel>
        <Controller
        name="id_poli"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
         <Select
         {...field}
         value={field.value || ""}
         labelId="id-poli-label"
         label="Poli"
         >
            {masterPoli.length > 0 ? (
        masterPoli.map((item) => (
            <MenuItem key={item.id} value={item.id}>
                {item.kode_poli} - {item.nama_poli}
            </MenuItem>
        ))
    ) : (
        <MenuItem value="" disabled>Memuat data...</MenuItem>
    )}
         </Select>
        )}
        />
    </FormControl>
      <FormControl>
        <Controller
        name="spesialis"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
            <TextField
            {...field}
            label="Spesialis"
            variant="outlined"
            fullWidth
            
            error={!!errors.spesiais}
            helperText={errors.spesialis?.message||""}
            
            />
        )}
        />
    </FormControl>
      <FormControl>
        <Controller
        name="no_telp"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
            <TextField
            {...field}
            label="No Telepon"
            variant="outlined"
            fullWidth
            
            error={!!errors.no_telp}
            helperText={errors.no_telp?.message||""}
            
            />
        )}
        />
    </FormControl>
    <FormControl>
         <InputLabel id="id-status-dokter">Status Dokter</InputLabel>
        <Controller
        name="status_dokter"
        control={control}
        rules={{required:"harus di isi"}}
        render={({field})=>(
         <Select
         {...field}
         labelId="id-status-dokter"
         label="Status Dokter"
         value={field.value || ""}
         >
          <MenuItem key="PNS" value="PNS">PNS</MenuItem>
          <MenuItem key="Non PNS" value="Non PNS">Non PNS</MenuItem>
          <MenuItem key="Kontrak" value="Kontrak">Kontrak</MenuItem>

         </Select>
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
          {initialData ? "Update" :"Tambah Dokter"}
        </button>
          {console.log(initialData)}
    </Stack>
    </form>
    </>
 );
 
}