import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { NavLink } from "react-router";

const drawerWidth = 240;

const menuItems = [
  { text: "Ringkasan", path: "/", icon: <HomeIcon /> },
  { text: "Analisis", path: "/analisis", icon: <BarChartIcon /> },
  { text: "Pengaturan", path: "/pengaturan", icon: <SettingsIcon /> },
  { text: "Ubah Password", path: "/ubahpassword", icon: <VpnKeyIcon /> },
  { text: "Logout", path: "/logout", icon: <LogoutIcon /> },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const drawer = (
    <Box sx={{ bgcolor: "grey.900", height: "100%" }}>
      <Toolbar>
        <Typography variant="h6" color="white" fontWeight="bold">SIP</Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "grey.700" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                color: "grey.300",
                "&.active": { bgcolor: "primary.main", color: "white" },
                "&:hover": { bgcolor: "grey.700", color: "white" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
