import {
  Box,
  Paper,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TablePagination,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const BaseTableLayout = ({
  title = "Data",
  searchValue,
  onSearchChange,
  onAdd,
  children,
  count = 0,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Box sx={{ width: "100%", position: "relative" }}>
        <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 2 }}>
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
            {onAdd && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ borderRadius: "12px", fontWeight: "bold" }}
                onClick={onAdd}
              >
                Tambah Data
              </Button>
            )}

            {onSearchChange && (
              <TextField
                label="Cari Data"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
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
            )}
          </Box>

          <TableContainer>
            <Table>{children}</Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            sx={{ borderTop: "1px solid", borderColor: "grey.200" }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default BaseTableLayout;
