import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  TablePagination,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { Api1 } from "../../../utils/Api1";
import PopUpCostum from "../../../components/PopUpCostum";
import MenuMasterForm from "./MenuMasterForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import { alertConfirmation } from "../../../components/alertConfirmation";
import Swal from "sweetalert2";
import { Toast } from "../../../components/Toast";

export default function Menu() {
  const showToast = Toast();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [menuMaster, setMenuMaster] = useState([]);
  const [token] = useLocalStorageEncrypt("token", null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loadingData, setLoadingData] = useState(false);
   const { confirm } = alertConfirmation();

  useEffect(() => {
    setLoadingData(true);
    const fetchmenumaster = async () => {
      try {
        console.log("Fetching menu data...");
        const { data, status } = await Api1(
          "/menu/all",
          "GET",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(status);
        setMenuMaster(data.data);
        setLoadingData(false);
        console.log("Data fetched successfully:", data.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setLoadingData(false);
      }
    };
    fetchmenumaster();
  }, [token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormSubmit = async (formData) => {
    console.log("Form submitted:", formData);
    const { data, status } = await Api1("/menu/add", "POST", formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log(data);
    console.log(status);
    handleClose();
      showToast('success', 'Data berhasil disimpan!');
  };

  const handleDelete = async (menuId) => {
    
    console.log(`Deleting menu with ID: ${menuId}`);
    const userConfirmed = await confirm({
      text: "Anda tidak akan bisa mengembalikan data ini!"
    });

    if (userConfirmed) {
      // Logika untuk menghapus data
      console.log(`Deleting item with ID: ${menuId}`);
      // Lakukan API call untuk hapus data di sini
      
      // Tampilkan SweetAlert sukses setelah penghapusan
      Swal.fire(
        'Deleted!',
        'Data Anda telah berhasil dihapus.',
        'success'
      );
    } else {
      console.log('Deletion cancelled.');
    }
  };


  const filteredMenus = menuMaster.filter((menu) =>
    menu.menu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedMenus = filteredMenus.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
        <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Menu
            </Typography>
          </CardContent>
        </Card>

        {/* Removed 'margin: auto' to align the box to the left */}
        <Box sx={{ 
          width: '80%'
        }}>
          <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid",
                borderColor: "grey.200",
                bgcolor: "grey.50",
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  mb: { xs: 2, sm: 0 }
                }}
              >
                Tambah Master Menu
              </Button>
              <TextField
                label="Cari Menu"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <SearchIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  mt: { xs: 2, sm: 0 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>
            <TableContainer>
              <Table aria-label="menu table">
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: "bold", bgcolor: "primary.light", color: "white" } }}>
                    <TableCell>Nama Menu</TableCell>
                    <TableCell>Jenis</TableCell>
                    <TableCell>Urutan</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingData ? (
                    Array.from(new Array(1)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton variant="text" /></TableCell>
                        <TableCell><Skeleton variant="text" /></TableCell>
                        <TableCell><Skeleton variant="text" /></TableCell>
                        <TableCell align="center"><Skeleton variant="rectangular" width={60} height={36} sx={{ margin: 'auto' }} /></TableCell>
                      </TableRow>
                    ))
                  ) : paginatedMenus.length > 0 ? (
                    paginatedMenus.map((menu, index) => (
                      <TableRow
                        key={menu.id_menu}
                        sx={{
                          "&:hover": { bgcolor: "action.hover" },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell size="small" component="th" scope="row">
                          {menu.menu}
                        </TableCell>
                        <TableCell size="small">{menu.jenis}</TableCell>
                        <TableCell size="small">{menu.urutan}</TableCell>
                        <TableCell align="center" size="small">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleDelete(menu.id)}
                              color="primary"
                              aria-label="edit menu"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton
                              onClick={() => handleDelete(menu.id)}
                              color="error"
                              aria-label="delete menu"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                      
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Tidak ada data yang ditemukan.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMenus.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
            />
          </Paper>
        </Box>
      </Box>

      <PopUpCostum
        open={open}
        handleClose={handleClose}
        title="Tambah Master Menu"
      >
        <MenuMasterForm onSubmit={handleFormSubmit} />
      </PopUpCostum>
    </>
  );
}