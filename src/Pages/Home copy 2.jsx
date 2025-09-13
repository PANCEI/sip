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
const iconStyle = { color: 'white', fontSize: '2rem' };
const summaryCards = [
  { icon: <Person sx={iconStyle} />, title: "Employees", value: 96, color: '#6a5acd' },
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 200px), 1fr))',
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
     {summaryCards.map((card, index) => (
             
                <Card sx={{ textAlign: 'center', backgroundColor: card.color }} key={index}>
                  <CardContent>
                    <Box sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mx: 'auto',
                      mb: 1
                    }}>
                      {card.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: 'white' }}>{card.title}</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>{card.value}</Typography>
                  </CardContent>
                </Card>
       
            ))}
           <Card sx={{ textAlign: 'center', backgroundColor: "#6a5acd" }} >
                  <CardContent>
                    <Box sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mx: 'auto',
                      mb: 1
                    }}>
                    <Person sx={iconStyle} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'white' }}>User</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>999</Typography>
                  </CardContent>
                </Card>   
                <Card
                    sx={{
                      textAlign: 'center',
                      backgroundColor: 'rgba(106, 90, 205, 0.6)', // ungu dengan transparansi
                      backdropFilter: 'blur(6px)', // efek blur
                      borderRadius: 3, // biar lebih smooth
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        <Person sx={iconStyle} />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        User
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
                        999
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
  sx={{
    textAlign: 'center',
    background: 'linear-gradient(135deg, #a797ff, #ff97e4)', // Warna gradient ungu ke pink
    backdropFilter: 'blur(6px)',
    borderRadius: 3,
  }}
>
  <CardContent>
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
        mb: 1,
      }}
    >
      {/* Warna ikon disesuaikan dengan latar belakang */}
      <Person sx={{ color: '#6a52ff', fontSize: '30px' }} />
    </Box>
    <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
      New users
    </Typography>
    <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
      1.35m
    </Typography>
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
