import { Card, CardContent, Typography } from "@mui/material";
import { useParams  } from "react-router";
import { useEffect } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";

export default function DetailAkses() {
  const { id } = useParams();
    console.log("id dari detail akses adalah :" , id);
    const [token] = useLocalStorageEncrypt("token", null);
    const getDataAkses = async()=>{
 
  try{
    console.log("memanggil data akses");
    const {data, status  }= await Api1(
        `/akses/${id}`,
        "GET",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
    );
    if(status === 200){
    
     
    }else{
     
    }
    console.log("status datanya adalah :" , status);
    console.log('data aksesnya adalah :' , data);

  }catch(error){
    console.log(error);
   
  }
}
useEffect(()=>{
  getDataAkses();
},[token])
  
                    
    
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">DetailAkses</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
  );
}
