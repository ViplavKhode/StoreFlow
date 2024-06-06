import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [submitButtonContent, setSubmitButtonContent] = useState("Create User")
  const [submitButtonColor, setSubmitButtonColor] = useState("primary")
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const handleFormSubmit = async (values) => {
    console.log(values)
    console.log("User Create")
    const token = localStorage.getItem('token');
    console.log(token);
    const url = 'http://127.0.0.1:8000/api/users/create-user/';
    fetch(`${url}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
      },
      body: JSON.stringify(values)
    })
    .then(response => {
        console.log("created userr", response);
        setSubmitButtonContent("User Created Successfully")
        setSubmitButtonColor("success")
    })
    .catch(error => {
      // setLoginError(true);
      console.error('Error:', error);
    });
  };


  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          role: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required('First Name is required'),
          last_name: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          handleFormSubmit(values)
          // try {
          //   setStatus({ success: false });
          //   setSubmitting(false);
          // } catch (err) {
          //   console.error(err);
          //   setStatus({ success: false });
          //   setErrors({ submit: err.message });
          //   setSubmitting(false);
          // }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.first_name}
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.first_name && errors.first_name)}
                  />
                  {touched.first_name && errors.first_name && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.first_name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.last_name && errors.last_name)}
                    id="lastname-signup"
                    type="last_name"
                    value={values.last_name}
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.last_name && errors.last_name && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.last_name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="role-input">Role</InputLabel>

                <Select
                    fullWidth
                    id="role-input"
                    value={values.role}
                    name="role"
                    onChange={handleChange}
                    placeholder="Select User Role"
                    inputProps={{}}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="inventory_manager">Inventory Manager</MenuItem>
                    <MenuItem value="warehouse_supervisor">Warehouse Supervisor</MenuItem>
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
              
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color={submitButtonColor}>
                    {submitButtonContent}
                  </Button>
                
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
