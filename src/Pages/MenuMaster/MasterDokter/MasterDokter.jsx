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
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterDokterForm from "./MasterDokterForm";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import EditIcon from '@mui/icons-material/Edit';
export default function MasterDokter() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [token] = useLocalStorageEncrypt('token', null);
  const [dokter, setDokter] = useState([]);
  const [pencarian, setPencarian] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = async (form) => {
    setOpen(false);
    console.log(form);
    try {
      if (form.id) {
        console.log('update data ');
        const {data , status} = await Api1('/edit-master-dokter', 'PUT', form, {
          Authorization: `Bearer ${token}`
        })
        console.log(data);
        if(status === 200  && data.message === 'berhasil'){
          getAllDokter();
        }
      } else {
        console.log('manambah data')
        const { data, status } = await Api1('/add-master-dokter', 'POST', form, {
          Authorization: `Bearer ${token}`
        })
        if(status === 200 && data.message ==='berhasil'){
          getAllDokter();
        }
        console.log(data);
      }
    } catch (err) {
      console.log('gagal dari api', err);
    } finally {

    }
  }
  const getAllDokter = async () => {
    setLoading(true);
    try {
      const { data, status } = await Api1('/get-all-dokter', 'GET', {}, {
        Authorization: `Bearer ${token}`
      })
      console.log(data)
      if (status === 200 && data.message === 'berhasil') {
        setDokter(data.data);
      }
    } catch (error) {
      console.log('api gagal', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllDokter();
  }, [token])
  const filtered = dokter.filter((item) =>
    item.nama_dokter?.toLowerCase().includes(pencarian.toLowerCase())
  );
  const handleToggleStatus = async () => {

  }
  return (
    <>
      <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "70vh", zIndex: 1 }}>
        <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Dokter
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ width: "100%", position: "relative", }}>
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
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ borderRadius: "12px", fontWeight: "bold" }}
                sixe="small"
                onClick={() => {
                  setOpen(true);
                  setEditData(null)
                }}
              >
                Tambah Master Dokter
              </Button>
              <TextField
                size="small"
                variant="outlined"
                label="Cari Dokter"

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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        fontWeight: "bold",
                        bgcolor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    <TableCell>Kode Dokter</TableCell>
                    <TableCell>Nama Dokter</TableCell>
                    <TableCell>Poli</TableCell>
                    <TableCell>Spesialis </TableCell>
                    <TableCell>NO SIP</TableCell>
                    <TableCell>No Telp</TableCell>
                    <TableCell>Status Dokter</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    loading ? (
                      Array.from(new Array(1)).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                          <TableCell><Skeleton variant="text" /></TableCell>
                        </TableRow>
                      ))
                    ) : filtered.length > 0 ? (
                      filtered.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item.kode_dokter}</TableCell>
                          <TableCell>{item.nama_dokter}</TableCell>
                          <TableCell>{item.poli.nama_poli}</TableCell>
                          <TableCell>{item.spesialis}</TableCell>
                          <TableCell>{item.no_sip}</TableCell>
                          <TableCell>{item.no_telp}</TableCell>
                          <TableCell>{item.status_dokter}</TableCell>
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
                            <Tooltip
                              color="primary"
                              aria-label="Edit Master Obat"
                              onClick={() => {
                                setEditData(item);
                                setOpen(true);
                              }
                                
                              }
                            >
                              <IconButton>
                                <EditIcon></EditIcon>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                          <Typography variant="body1" color="text.secondary">
                            Tidak ada data yang ditemukan.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
      <PopUpCostum
        open={open}
        handleClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        title={editData ? "Edit Master Dokter" : "Tambah Master Dokter"}
        children={<MasterDokterForm onSubmit={handleSubmit} initialData={editData} />}
      >

      </PopUpCostum>
    </>
  );
}
