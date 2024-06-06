
import { Grid,  Stack, Typography } from '@mui/material';

import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';
import CustomerInfo from '../dashboard/CustomerInfo';


const Customers = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Stack spacing={3}>
          <MainCard>
            <Stack spacing={1} sx={{ mt: -1.5 }}>
              <Typography variant="h1">Customers</Typography>
              <br />
              <CustomerInfo /> {}
            </Stack>
            <Grid item xs={12} md={7} lg={12}>
              <Grid container alignItems="center" justifyContent="space-between">
              </Grid>
              </Grid>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Customers;