import { Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">HOME</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
  );
}
