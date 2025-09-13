import { NavLink } from "react-router";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import iconMap from "../utils/IconMap";
import { Dashboard } from "@mui/icons-material";

const drawerWidth = 240;

export default function Sidebar({ menus, mobileOpen, handleDrawerToggle }) {
  const drawer = (
    <Box sx={{ bgcolor: "grey.900", height: "100%" }}>
      {/* Header */}
      <Toolbar>
        <Typography variant="h6" color="white" fontWeight="bold">
          SIP
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "grey.700" }} />

      {/* Menu List */}
      {menus.map((menuWrapper) => (
        <List
          key={menuWrapper.id}
          subheader={
            <ListSubheader
              sx={{
                bgcolor: "grey.900",
                color: "grey.400",
                fontWeight: "bold",
                lineHeight: "32px",
              }}
            >
              {menuWrapper.menu.menu}
            </ListSubheader>
          }
        >
          {menuWrapper.menu.submenus?.map((submenu) => (
            <ListItem key={submenu.id} disablePadding>
              <ListItemButton
                component={NavLink}
                to={`/${submenu.path.toLowerCase()}`}
                sx={{
                  color: "grey.300",
                  "&.active": { bgcolor: "primary.main", color: "white" },
                  "&:hover": { bgcolor: "grey.800", color: "white" },
                }}
              >
              
                  <ListItemIcon sx={{ color: "inherit" }}>
                      {(() => {
                        const IconComponent = iconMap[submenu.icon] || Dashboard;
                        return <IconComponent />;
                      })()}
                    </ListItemIcon>
                <ListItemText primary={submenu.nama_sub_menu} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, bgcolor: "grey.900" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, bgcolor: "grey.900" },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
