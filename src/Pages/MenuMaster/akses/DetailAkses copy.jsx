import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Api1 } from "../../../utils/Api1";
import { useLocalStorageEncrypt } from "../../../helper/CostumHook";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  List,
  Button,
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

  // update akses ke backend
  const updateAkses = async (newRight) => {
    try {
      const aksesIds = newRight.map((m) => m.id);

      const { data, status } = await Api1(
        `/akses/update/${id}`,
        "POST",
        { menu_ids: aksesIds },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("Update akses response:", status, data);
    } catch (error) {
      console.error("Error update akses:", error);
    }
  };

  const handleAdd = (item) => {
    const newRight = [...right, item];
    setLeft(left.filter((i) => i.id !== item.id));
    setRight(newRight);
    updateAkses(newRight);
  };

  const handleRemove = (item) => {
    const newRight = right.filter((i) => i.id !== item.id);
    setRight(newRight);
    setLeft([...left, item]);
    updateAkses(newRight);
  };

  // if (loading) {
  //   return <Typography>Loading...</Typography>;
  // }

  if (!dataAkses) {
    return <Typography>Error memuat data</Typography>;
  }

  return (
    <>
    <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh", zIndex: 1 }}>
            <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Menu
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
          width: '80%',
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
                        <CircularProgress />
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

 {/* Content */}
        <Grid container spacing={3}>
          {/* Belum Ada Akses */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Belum Ada Akses
            </Typography>
            <Paper sx={{ height: 350, overflow: "auto", p: 1 }}>
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
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Typography>{item.menu}</Typography>
                      <Typography color="primary">➔</Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Sudah Ada Akses */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sudah Ada Akses
            </Typography>
            <Paper sx={{ height: 350, overflow: "auto", p: 1 }}>
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
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                      >
                      <Typography>{item.menu}</Typography>
                      <Typography color="error">←</Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
                    </Box>
                    </Paper>
        </Box>
    </Box>
    <Card sx={{ p: 3, maxWidth: 1000, mx: "auto", mt: 3, boxShadow: 3 }}>
      <CardContent>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Detail Akses: ID {dataAkses.id}
          </Typography>
          <Button variant="contained" color="primary">
            + Tambah Akses
          </Button>
        </Grid>

        {/* Content */}
        <Grid container spacing={3}>
          {/* Belum Ada Akses */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Belum Ada Akses
            </Typography>
            <Paper sx={{ height: 350, overflow: "auto", p: 1 }}>
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
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Typography>{item.menu}</Typography>
                      <Typography color="primary">➔</Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Sudah Ada Akses */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sudah Ada Akses
            </Typography>
            <Paper sx={{ height: 350, overflow: "auto", p: 1 }}>
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
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                      >
                      <Typography>{item.menu}</Typography>
                      <Typography color="error">←</Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
                      </>
  );
}
