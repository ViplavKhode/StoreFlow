import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Stack, Typography } from '@mui/material';

import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import WareHouseBg from './../../assets/images/warehouse.png'
import './../../styles/Login.css'
import { useEffect, useState } from 'react';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking role")
    // Check if the token exists in local storage
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate('/dashboard/default');
    }
  }, [location]);

  return(
    <div className='login-container'>
      <div className='login-bg'>
        <img src={WareHouseBg}/>
      </div>
      <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
    </div>
  );
}
export default Login;
