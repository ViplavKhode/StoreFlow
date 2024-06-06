
import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

import OrdersTable from './OrdersTable';
import ReportAreaChart from './ReportAreaChart';
import MainCard from '../../components/MainCard';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';

const DashboardDefault = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Items in Inventory" count="1,24,357" percentage={59.3} />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Orders" count="78,250" percentage={70.5}/>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Pending Orders" count="18,800" percentage={27.4} isLoss color="warning" />
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      
      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5"><u>Analytics Report</u></Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" href='/analytics'>Detailed Analytics</Button>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Increase in Orders" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Increase in Cancelled Orders" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Issues Raised per Month" />
              <Typography variant="h5">11</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
