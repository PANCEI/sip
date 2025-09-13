import { Card, CardContent, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">404</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
  );
}
