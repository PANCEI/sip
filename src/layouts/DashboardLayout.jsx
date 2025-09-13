import { Box, CssBaseline } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { useState } from "react";

export default function DashboardLayout({ menus }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar menus={menus} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, bgcolor: "grey.200" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
