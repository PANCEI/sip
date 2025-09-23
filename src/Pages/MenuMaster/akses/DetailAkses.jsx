import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import { encryptData } from "../../../helper/DecodeSlug";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  Box,
  CircularProgress,
} from "@mui/material";

export default function DetailAkses() {
  const { id } = useParams();
  const [token] = useLocalStorageEncrypt("token", null);

  const [dataAkses, setDataAkses] = useState(null);
  const [loading, setLoading] = useState(true);

  const [left, setLeft] = useState([]); // belum ada akses
  const [right, setRight] = useState([]); // sudah ada akses

  const getDataAkses = async () => {
    try {
      const { data, status } = await Api1(
        `/akses/${id}`,
        "GET",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (status === 200) {
        setDataAkses(data);
        const menuAksesIds = data.menuakses.map((m) => m.id_menu);
        setRight(data.menu.filter((m) => menuAksesIds.includes(m.id)));
        setLeft(data.menu.filter((m) => !menuAksesIds.includes(m.id)));
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getDataAkses();
  }, [token]);

  // Fungsi baru untuk mengirim data ke API
  const updateAksesAPI = async (payload) => {
    console.log(payload);
    const id_menu = encryptData(payload.menu_id.toString());
    try {
       setLoading(true);
      if(payload.type == 'add'){
        // tambah akses 
        console.log("nambah")
        console.log(id_menu);
        const {data , status} = await Api1(
          '/tambahAkses',
          "POST",
          {
            id_menu:id_menu,
            id_akses:id
          },
          {
          Authorization: `Bearer ${token}`,
        }
        );
        console.log("data dari api adalah", data);
        console.log("status dari api adalah " , status );
        if (status !== 200) {
        throw new Error("Update failed with status: " + status);
      }
      console.log("Akses berhasil diperbarui!");
      return true;
      }else{
        const {data , status} = await Api1(
          '/deleteAkses',
          "DELETE",
          {
            id_menu:id_menu,
            id_akses:id
          },
          {
          Authorization: `Bearer ${token}`,
        }
        );
         console.log("data dari api adalah", data);
        console.log("status dari api adalah " , status );
        console.log('kurang')
         if (status !== 200) {
        throw new Error("Update failed with status: " + status);
      }
      console.log("Akses berhasil diperbarui!");
      return true;
      }
    
    } catch (error) {
      console.error("Error update akses:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (item) => {
    const prevLeft = [...left];
    const prevRight = [...right];

    // Optimistic UI update
    setLeft(left.filter((i) => i.id !== item.id));
    setRight([...right, item]);

    const success = await updateAksesAPI({ menu_id: item.id, type: "add" });
    if (!success) {
      // Jika API gagal, kembalikan state ke semula
      setLeft(prevLeft);
      setRight(prevRight);
    }
  };

  const handleRemove = async (item) => {
    const prevLeft = [...left];
    const prevRight = [...right];

    // Optimistic UI update
    setRight(right.filter((i) => i.id !== item.id));
    setLeft([...left, item]);

    const success = await updateAksesAPI({ menu_id: item.id, type: "remove" });
    if (!success) {
      // Jika API gagal, kembalikan state ke semula
      setLeft(prevLeft);
      setRight(prevRight);
    }
  };

  // if (!dataAkses) {
  //   return <Typography>Error memuat data</Typography>;
  // }

  return (
    <>
      <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "80vh", zIndex: 1 }}>
        <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Detail Akses
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
          width: '100%',
          position: 'relative',
        }}>
          {loading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              p: 2,
              borderRadius: '12px',
            }}>
              <CircularProgress thickness={5} /> 
              <Typography variant="h6" color="text.secondary" mt={2}>
                Menyimpan...
              </Typography>
            </Box>
          )}
          <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid",
                borderColor: "grey.200",
                bgcolor: "grey.50",
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 4, 
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100%',
                }}
              >
                <Box sx={{ flex: 1, minWidth: { md: 300 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Belum Ada Akses
                  </Typography>
                  <Paper
                    sx={{
                      height: 350,
                      overflow: "auto",
                      p: 1,
                      border: "2px solid #bdbdbd",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      borderRadius: "12px",
                      width: "100%",
                    }}
                  >
                    <List dense>
                      {left.map((item) => (
                        <Card
                          key={item.id}
                          variant="outlined"
                          sx={{
                            mb: 1,
                            cursor: "pointer",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                          onClick={() => handleAdd(item)}
                        >
                          <CardContent sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                            <Typography>{item.menu}</Typography>
                            <Typography color="primary">➔</Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  </Paper>
                </Box>
                <Box sx={{ flex: 1, minWidth: { md: 300 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Sudah Ada Akses
                  </Typography>
                  <Paper
                    sx={{
                      height: 350,
                      overflow: "auto",
                      p: 1,
                      border: "2px solid #bdbdbd",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      borderRadius: "12px",
                      width: "100%",
                    }}
                  >
                    <List dense>
                      {right.map((item) => (
                        <Card
                          key={item.id}
                          variant="outlined"
                          sx={{
                            mb: 1,
                            cursor: "pointer",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                          onClick={() => handleRemove(item)}
                        >
                          <CardContent sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                            <Typography>{item.menu}</Typography>
                            <Typography color="error">←</Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}