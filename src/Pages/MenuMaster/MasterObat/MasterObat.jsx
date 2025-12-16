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
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterObatForm from "./MasterObarForm";
import { Toast } from "../../../components/Toast";
import { alertConfirmation } from "../../../components/alertConfirmation";

export default function MasterObat() {
  const { confirm } = alertConfirmation();
  const [masterObat, setMasterObat] = useState([]);
  const [pencarian, setPencarian] = useState("");
  const [token] = useLocalStorageEncrypt("token", null);
  const [loadingData, setLoadingData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const showToast = Toast();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
   const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ambil data semua obat
  const fetchMasterObat = async () => {
    try {
      setLoadingData(true);
      const { data, status } = await Api1(
        "/all-obat",
        "GET",
        {},
        { Authorization: `Bearer ${token}` }
      );
      if (status === 200) setMasterObat(data.data || []);
    } catch (error) {
      console.error("Gagal ambil master obat:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchMasterObat();
  }, [token]);

  // tambah data
  const handleFormSubmit = async (formData) => {
    handleClose();
    try {
      if(formData.flag_delete === "tidak"){
        setLoadingData(true);
        
        const { data, status } = await Api1(
          "/add-master-obat",
          "POST",
          formData,
          { Authorization: `Bearer ${token}` }
        );
        if (status === 201 || status === 200) {
          await fetchMasterObat();
           setLoadingData(false);
        }
      }else{
        // edit
        setLoadingData(true);
        console.log(formData)
        const {data , status} = await Api1(
          `/update-nama-master-obat`,
          "PUT",
          formData,
          { Authorization: `Bearer ${token}` }
        );
         if (status === 201 || status === 200) {
          await fetchMasterObat();
           setLoadingData(false);
        }

      }

    } catch (error) {
      console.error("Gagal tambah obat:", error);
       setLoadingData(false);
    }
  };

  // toggle aktif/nonaktif
  const handleToggleStatus = async (item) => {
    setLoadingData(true);
    try {
      const newStatus = item.flag_delete === 1 ? 0 : 1;
      const { data, status } = await Api1(
        `/update-flag-master-obat`,
        "PUT",
        { flag_delete: newStatus,
          kode_obat:item.kode_obat
         },
        { Authorization: `Bearer ${token}` }
      );
      console.log(data);
      if (status === 200) {
        setMasterObat((prev) =>
          prev.map((obat) =>
            obat.kode_obat === item.kode_obat
              ? { ...obat, flag_delete: newStatus }
              : obat
          )
        );
        showToast("success", data.data); 
            setLoadingData(false);
      }
    } catch (error) {
      console.error("Gagal ubah status:", error);
       setLoadingData(false);
    }
  };

  const filtered = masterObat.filter((item) =>
    item.nama_obat?.toLowerCase().includes(pencarian.toLowerCase())
  );
  // untuk edit data masster obat
  const handleEdit =(item) =>{
    console.log(item);
    setEditData(item);
    handleOpen();

  }
//  untuk delete data master obat
const deleteData = async(item)=>{
  const konfirmasi = await confirm({
    text: "Anda tidak bisa mengembalikan data ini setelah dihapus.",
  });
   if (!konfirmasi) return;
   const prevData = [...masterObat];
   setMasterObat(prevData.filter((obat) => obat.kode_obat !== item));
  console.log(item);
      setLoadingData(true);
  try{
    
    const  {data , status} = await Api1(
      `/delete-master-obat`,
      "DELETE",
      {kode_obat:item},
      { Authorization: `Bearer ${token}` }

    );
    if(status === 200){
      showToast("success", data.data);
     // await fetchMasterObat();
    }

  }catch(error){
    console.error("gagal delete data master obat :", error);
    setMasterObat(prevData);

  }finally{
    setLoadingData(false);
  }
}

  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Master Obat
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ width: "80%", position: "relative" }}>
        <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 2 }}>
          {/* Header Table */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid",
              borderColor: "grey.300",
              bgcolor: "grey.50",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ borderRadius: "12px", fontWeight: "bold" }}
              onClick={() => {
                setEditData(null);
                handleOpen();
              }}
            >
              Tambah Obat
            </Button>

            <TextField
              label="Cari Master Obat"
              variant="outlined"
              size="small"
              value={pencarian}
              onChange={(e) => setPencarian(e.target.value)}
                 slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              sx={{
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 2, sm: 0 },
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      fontWeight: "bold",
                      bgcolor: "success.main",
                      color: "white",
                    },
                  }}
                >
                  <TableCell>Kode Obat</TableCell>
                  <TableCell>Nama Obat</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Komposisi</TableCell>
                  <TableCell>Katggori</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingData ? (
                  Array.from({ length: 1 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" width={60} height={36} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.kode_obat}</TableCell>
                      <TableCell>{item.nama_obat}</TableCell>
                      <TableCell>{item.satuan?.satuan}</TableCell>
                      <TableCell>{item.Kandungan}</TableCell>
                      <TableCell>{item.kategori.map((kategoriitem, i)=> kategoriitem.nama_kategori ). join(', ')}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            item.flag_delete === 1
                              ? "Klik untuk mengaktifkan"
                              : "Klik untuk menonaktifkan"
                          }
                        >
                          <Switch
                            checked={item.flag_delete === 0}
                            onChange={() => handleToggleStatus(item)}
                            color={item.flag_delete === 1 ? "error" : "success"}
                          />
                        </Tooltip>
                        {item.flag_delete === 1 ? "Nonaktif" : "Aktif"}
                      </TableCell>
                      <TableCell>
                        {/* tombiol untuk delete sama edit */}
                        <Tooltip
                        color="primary"
                        aria-label="Edit Master Obat"
                        onClick={()=>handleEdit(item)}
                        >
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip
                        color="error"
                        aria-label="delete master obat"
                        onClick={()=>deleteData(item.kode_obat)}
                        >
                          <IconButton>
                            <DeleteIcon></DeleteIcon>
                          </IconButton>

                        </Tooltip> */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
           <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filtered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
                      />
        </Paper>
      </Box>

      {/* Modal Tambah/Edit */}
      <PopUpCostum
        open={open}
        handleClose={handleClose}
        title={editData ? "Edit Master Obat" : "Tambah Master Obat"}
      >
        <MasterObatForm onSubmit={handleFormSubmit} initialData={editData} />
      </PopUpCostum>
    </Box>
  );
}
