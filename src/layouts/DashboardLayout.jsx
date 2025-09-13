 import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Api1 } from "../utils/Api1";
import { useEffect } from "react";
import { useLocalStorageEncrypt } from "../helper/CostumHook";
export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
   const [token] = useLocalStorageEncrypt("token", null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(()=>{
  console.log(token);
  })

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, bgcolor: "grey.200" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
