import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "grey.900",
        color: "white",
        textAlign: "center",
        p: 2,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%"
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Dashboard App
      </Typography>
    </Box>
  );
}
