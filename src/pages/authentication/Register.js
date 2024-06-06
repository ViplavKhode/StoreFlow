import { Link, useLocation } from 'react-router-dom';

import { Grid, Stack, Typography } from '@mui/material';

import UserRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';
import { useEffect, useState } from 'react';
import PermissionDeniedImage from './../../assets/images/permission_denied.jpg'


const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log("Checking role")
    // Check if the token exists in local storage
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user, user["role"])
    if (user && user["role"] == "admin") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return(
    <div>
      {
        isLoggedIn ? 
        (<AuthWrapper>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                  <Typography variant="h3">Create User</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <UserRegister />
              </Grid>
            </Grid>
          </AuthWrapper>
          ) : (
            <h3>No Permission to access this link.</h3>
              // <img height="10%" width="100%" align="center" src={PermissionDeniedImage}/>
            )
      }
    </div>
    
)};

export default Register;
