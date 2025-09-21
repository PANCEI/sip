import { NavLink } from "react-router";
import { useState } from "react";
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
  Collapse,
} from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore } from "@mui/icons-material";
import iconMap from "../utils/IconMap";

const drawerWidth = 240;

export default function Sidebar({ menus, mobileOpen, handleDrawerToggle }) {
  const [open, setOpen] = useState({});

  const handleClick = (menuId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [menuId]: !prevOpen[menuId],
    }));
  };

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
      {menus.map((menuWrapper) => {
        const isFolder = menuWrapper.menu.jenis.toLowerCase() === "folder";

        return (
          <List
            key={menuWrapper.id}
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: "grey.900",
                  color: "grey.400",
                  fontWeight: "bold",
                  lineHeight: "32px",
                  marginTop: "8px",
                }}
              ></ListSubheader>
            }
          >
            {isFolder ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleClick(menuWrapper.id)}
                    sx={{
                      color: "grey.300",
                      "&:hover": { bgcolor: "grey.800", color: "white" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {(() => {
                        const IconComponent =
                          iconMap[menuWrapper.menu.icon] || Dashboard;
                        return <IconComponent />;
                      })()}
                    </ListItemIcon>
                    <ListItemText primary={menuWrapper.menu.menu} />
                    {open[menuWrapper.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open[menuWrapper.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuWrapper.menu.submenus
                      ?.filter((submenu) => !submenu.sub) // hanya tampilkan jika submenu.sub kosong/null
                      .map((submenu) => (
                        <ListItem key={submenu.id} disablePadding sx={{ pl: 4 }}>
                          <ListItemButton
                            component={NavLink}
                            to={`/${submenu.path.toLowerCase()}`}
                            sx={{
                              color: "grey.300",
                              "&.active": {
                                bgcolor: "primary.main",
                                color: "white",
                              },
                              "&:hover": {
                                bgcolor: "grey.800",
                                color: "white",
                              },
                            }}
                          >
                            <ListItemIcon sx={{ color: "inherit" }}>
                              {(() => {
                                const IconComponent =
                                  iconMap[submenu.icon] || Dashboard;
                                return <IconComponent />;
                              })()}
                            </ListItemIcon>
                            <ListItemText primary={submenu.nama_sub_menu} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </>
            ) : (
              // Menu jenis File → juga dicek sub nya
              !menuWrapper.menu.submenus?.[0]?.sub && (
                <ListItem key={menuWrapper.id} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={`/${
                      menuWrapper.menu.submenus?.[0]?.path.toLowerCase() || ""
                    }`}
                    sx={{
                      color: "grey.300",
                      "&.active": {
                        bgcolor: "primary.main",
                        color: "white",
                      },
                      "&:hover": { bgcolor: "grey.800", color: "white" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {(() => {
                        const IconComponent =
                          iconMap[menuWrapper.menu.icon] || Dashboard;
                        return <IconComponent />;
                      })()}
                    </ListItemIcon>
                    <ListItemText primary={menuWrapper.menu.menu} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        );
      })}
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
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "grey.900",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "grey.900",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
