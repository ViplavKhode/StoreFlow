
import { Grid,  Stack, Typography } from '@mui/material';

import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';

import ListOrders from '../dashboard/ListOrders';

const Orders = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Stack spacing={3}>
          <MainCard>
            <Stack spacing={1} sx={{ mt: -1.5 }}>
              <Typography variant="h1">List of Orders</Typography>
            </Stack>

            <Grid item xs={12} md={7} lg={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">Recent Orders</Typography>
                </Grid>
                <Grid item />
              </Grid>
              
              <MainCard sx={{ mt: 2 }} content={false}>
                <ListOrders />
              </MainCard>
            </Grid>


          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Orders;
