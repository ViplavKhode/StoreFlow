
import { Grid,  Stack, Typography } from '@mui/material';

import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';

const Products = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Stack spacing={3}>
          <MainCard>
            <Stack spacing={1} sx={{ mt: -1.5 }}>
              <Typography variant="h1">List of Products</Typography>
              <Typography variant="h5">Available Products</Typography>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Products;
