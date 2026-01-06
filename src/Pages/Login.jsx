import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Box, TextField, Button, Typography, Paper, Link, CircularProgress} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { Api1 } from '../utils/Api1';
import { CostumAlert } from '../utils/CostumAlert';
// import { useLocalStorageEncrypt } from '../helper/CostumHook';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext';
// Komponen Paper yang disesuaikan
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));


const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  color: theme.palette.primary.contrastText,   
  backgroundColor: theme.palette.primary.main, 
  '&:hover': {
    backgroundColor: theme.palette.primary.light, 
  },
}));


const Login = () => {
  const navigate = useNavigate()
   const { login } = useContext(AuthContext);
// const [user, setUser] = useLocalStorageEncrypt("user", null);
// const [token, setToken] = useLocalStorageEncrypt("token", null);
// const [akses , setAkses] = useLocalStorageEncrypt('akses', null)
  const { register, handleSubmit, formState: { errors } } = useForm();
  // state untuk mengolah dialog
  const [dialog, setDialog] = useState({ open: false, title: '', message: '' });
  //  state untuk melakukan pengolahanan loading
  const [loading , setLoading ] = useState(false);
   const handleOpenDialog = (title, message) => {
    setDialog({ open: true, title, message });
  };

  const handleCloseDialog = () => {
    setDialog({ ...dialog, open: false });
  };
  const handleLogin = async (dataform) => {
    setLoading(true)
    // Data formulir sudah divalidasi oleh React Hook Form
    console.log('Login berhasil dengan:', dataform);
    const {data , error, status} = await Api1("/login", "POST", dataform);

    if(status != 200){
      handleOpenDialog('Login Gagal!', 'Email atau kata sandi salah. Silakan coba lagi.');
    console.error("Login gagal:", error);
    }else{
   console.log("Data dari API:", data);
   login(data)
    //  setUser(data.user);
    // setToken(data.token);
    // setAkses(data.akses);
    console.log("User di hook (after setUser):", { user: data.user, token: data.token });
    // handleOpenDialog('Login Berhasil!', 'Selamat datang kembali.');
    //  const { data: menuData, status: menuStatus } = await Api1("/menu", "GET", {}, {
    //   Authorization: `Bearer ${data.token}`,
    // });
    // console.log("Data menu dari API:", menuData);
    //  navigate("/", { state: { menus: menuData } });
   // handleOpenDialog('Login Berhasil!', 'Selamat datang kembali.');
   // navigate("/")
     handleOpenDialog('Login Berhasil!', 'Selamat datang kembali.');
     navigate("/"); // Navigasi setelah login berhasil
    }

  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // Mengatur warna background
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <LockOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography component="h1" variant="h5" mt={1}>
            Masuk
          </Typography>
          <StyledForm onSubmit={handleSubmit(handleLogin)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', { 
                required: 'Email harus diisi',
                pattern: {
                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Format email tidak valid"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Kata Sandi"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { 
                required: 'Kata sandi harus diisi'
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Masuk
            </StyledButton>
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Link href="#" variant="body2">
                Lupa kata sandi?
              </Link>
              <Link href="#" variant="body2">
                {"Belum punya akun? Daftar"}
              </Link>
            </Box>
          </StyledForm>
        </StyledPaper>
      </Container>
        <CostumAlert 
        open={dialog.open} 
        title={dialog.title} 
        message={dialog.message} 
        onClose={handleCloseDialog} 
      />
    </Box>
  );
};

export default Login;
