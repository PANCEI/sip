import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

// Asumsikan Anda menggunakan react-router-dom
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function Header({ handleDrawerToggle }) {
  const {logout} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate
  
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    // 1. Hapus item dari localStorage atau sessionStorage
    // localStorage.clear(); // Ganti 'userToken' dengan nama kunci yang Anda gunakan
    logout();
    // 2. Tutup menu
    handleMenuClose();

    // 3. Arahkan pengguna kembali ke halaman login
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "white",
        color: "grey.800",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "medium" }}>
          Dashboard
        </Typography>
        <IconButton
          // sx={{
          //   width: 40, height: 40, bgcolor: "grey.300", borderRadius: "50%",
          //   display: "flex", alignItems: "center", justifyContent: "center", color: "grey.600"
          // }}
          onClick={handleMenuClick}
        >
          jsas
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
          <MenuItem onClick={handleMenuClose}>Akun Saya</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Keluar</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}