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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import PopUpCostum from "../../../components/PopUpCostum";
import MasterObatForm from "./MasterObarForm";

export default function MasterObat() {
  const [masterObat, setMasterObat] = useState([]);
  const [pencarian, setPencarian] = useState("");
  const [token] = useLocalStorageEncrypt("token", null);
  const [loadingData, setLoadingData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditData(null);
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

  const handleFormSubmit = async (formData) => {
    handleClose();
    try {
      const { data, status } = await Api1(
        "/add-master-obat",
        "POST",
        formData,
        { Authorization: `Bearer ${token}` }
      );
      if (status === 201 || status === 200) {
        await fetchMasterObat();
      }
    } catch (error) {
      console.error("Gagal tambah obat:", error);
    }
  };

  const filtered = masterObat.filter((item) =>
    item.nama_obat?.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Master Obat
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ width: "50%", position: "relative" }}>
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
                <TableRow>
                  <TableCell>Kode Obat</TableCell>
                  <TableCell>Nama Obat</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingData ? (
                  Array.from({ length: 3 }).map((_, i) => (
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
                        <Skeleton variant="rectangular" width={60} height={36} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.kode_obat}</TableCell>
                      <TableCell>{item.nama_obat}</TableCell>
                      <TableCell>{item.flag_delete === "Y" ? "Nonaktif" : "Aktif"}</TableCell>
                      <TableCell>-</TableCell>
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
        </Paper>
      </Box>

      {/* Modal Tambah/Edit */}
      <PopUpCostum
        open={open}
        handleClose={handleClose}
        title={editData ? "Edit Master Obat" : "Tambah Master Obat"}
      >
      
      </PopUpCostum>
    </Box>
  );
}
