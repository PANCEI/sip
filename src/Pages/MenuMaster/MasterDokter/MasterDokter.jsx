import { Card, CardContent, Typography } from "@mui/material";

export default function MasterDokter() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Master Obat</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
  );
}
