import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid
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
} from '@mui/icons-material';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

// Reusable style for the icons
const iconStyle = { color: 'white', fontSize: '2rem' };

// Centralized and consistent card data
const summaryCards = [
  { icon: <Person sx={iconStyle} />, title: "Employees", value: 96, startColor: '#6a5acd', endColor: '#9c88ff' },
  { icon: <Layers sx={iconStyle} />, title: "Projects", value: 356, startColor: '#03a9f4', endColor: '#4fc3f7' },
  { icon: <Event sx={iconStyle} />, title: "Events", value: 696, startColor: '#f44336', endColor: '#ff7961' },
  { icon: <AttachMoney sx={iconStyle} />, title: "Payroll", value: '$96k', startColor: '#4caf50', endColor: '#81c784' },
  { icon: <Share sx={iconStyle} />, title: "Reports", value: 59, startColor: '#1a237e', endColor: '#534bae' },
  { icon: <Person sx={iconStyle} />, title: "New Users", value: '1.35M', startColor: '#ff9800', endColor: '#ffb74d' },
];

// Reusable card component to ensure consistency
const SummaryCard = ({ icon, title, value, startColor, endColor }) => (
  <Card
    sx={{
      textAlign: 'center',
      background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
      backdropFilter: 'blur(6px)',
      borderRadius: 3,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
      cursor: 'pointer'
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
        {icon}
      </Box>
      <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function Home() {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" marginBottom={2}>
        Dashboard
      </Typography>
      
      {/* Summary Cards Section */}
      <Box sx={{ mb: 4 }}>
        {/* <Typography variant="h6" fontWeight="bold" mb={2}>
          Quick Overview
        </Typography> */}
        <Grid  spacing={1} 
           sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(600px, 200px), 1fr))',
        gap: 2,
      }}
          >

          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={12} key={index}>
              <SummaryCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Revenue Chart Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">Revenue Updates</Typography>
          <Typography variant="body2" color="text.secondary">Monthly Revenue Performance</Typography>
          <Box sx={{ height: 300, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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