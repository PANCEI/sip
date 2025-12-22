import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Skeleton,
  Switch,
  Tooltip,
  IconButton,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
export default function Medicine() {
  const [token] = useLocalStorageEncrypt("token", null);
  const getData= async () => {
    try{
    const {data , status} = await Api1('/all-storage-medicine', "GET", {}, { Authorization: `Bearer ${token}` });
    if(status === 200){
      console.log(data);
    }
    }catch(error){
      console.error("Error fetching medicine data:", error);
    }
  }
  getData();
  return (
   <>
   <Box sx={{p:2 , bgcolor:"grey,100", minHeight:'90vh'}}>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 , minWidth: "300px"}}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Master Obat
              </Typography>
            </CardContent>
          </Card>
   </Box>
   </>
  );
}
