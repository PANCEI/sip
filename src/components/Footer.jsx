import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "grey.900", color: "white", textAlign: "center", p: 2, mt: "auto" }}>
      <Typography variant="body2">© {new Date().getFullYear()} Dashboard App</Typography>
    </Box>
  );
}
