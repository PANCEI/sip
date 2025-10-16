import { Card, CardContent, Typography, Button, Box, TextField , Paper, TablePagination, IconButton, Tooltip, Skeleton, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
export default function KategoriObat() {
  return (
    <Box sx={{p:3 , bgcolor:"grey.100", minHeight:"70vh" , zIndex:1}}>
        <Card sx={{mb:3, borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.05)"}}>
         <CardContent>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Master Kategori Obat
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
          width: '40%',
          position: 'relative',
        }}>
            {/* untuk body table */}
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
                {/* tombol tambah */}
                <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                  sx={{ borderRadius: "12px", fontWeight: "bold" }}
                  sixe="small"
                >
                    Tambah Kategori
                </Button>
                <TextField
                size="small"
                variant="outlined"
                label="Cari Kategori"
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
            </Paper>
        </Box>
      
    </Box>

  );
}
