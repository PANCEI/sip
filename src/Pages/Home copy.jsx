import { 
  Card,
   CardContent,
  Typography,
  Box, 

} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Person,

  Layers,
  Event,
  AttachMoney,
  Share,
} from '@mui/icons-material'
const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];
const summaryCards = [
  { icon: <Person sx={iconStyle} />, title: "Employees", value: 96, color: '#6a5acd' },
  { icon: <Briefcase sx={iconStyle} />, title: "Clients", value: 3650, color: '#ffb74d' },
  { icon: <Layers sx={iconStyle} />, title: "Projects", value: 356, color: '#03a9f4' },
  { icon: <Event sx={iconStyle} />, title: "Events", value: 696, color: '#f44336' },
  { icon: <AttachMoney sx={iconStyle} />, title: "Payroll", value: '$96k', color: '#4caf50' },
  { icon: <Share sx={iconStyle} />, title: "Reports", value: 59, color: '#1a237e' },
];
export default function Home() {
  return (
    
    <>
    <Typography variant="h6" fontWeight="bold" marginBottom={"4px"}>HOME</Typography>
    <Box
     sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 400px), 1fr))',
        gap: 2,
      }}
    >
     
          
     <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Jumlah Menu</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
     <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Jumlah User</Typography>
        <Typography variant="body2" color="text.secondary">Atur preferensi aplikasi di sini.</Typography>
      </CardContent>
    </Card>
    </Box>
     <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Revenue Updates</Typography>
        <Typography variant="body2" color="text.secondary">Overview of Profit</Typography>
        <Box sx={{ height: 250, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
    </>

  );
}
