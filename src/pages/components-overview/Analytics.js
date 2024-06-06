import { Grid } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';
import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AnalyticCharts from '../../components/cards/statistics/AnalyticCharts';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { axisClasses } from '@mui/x-charts';
import {Typography}  from '@mui/material';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
}));

const chartSetting = {
    yAxis: [
        {
            label: 'Orders',
        },
    ],
    width: 550,
    height: 200,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
    },
};

function Analytics() {
    const [age, setAge] = React.useState('');
    const [pname, setPname] = React.useState('');
    const [chartData, setChartData] = React.useState({
        totalOrders: Array(12).fill(0), // Initialize with 0s instead of 1s
        cancelledOrders: Array(12).fill(0), // Initialize with 0s instead of 1s
    });

    const [countOrders, setCountOrders] = React.useState({
        totalOrdersCounts: 0, // Initialize with 0s instead of 1s
        cancelledOrdersCounts: 0, // Initialize with 0s instead of 1s
    });

    const content = [(
        <span>{`200`} Orders</span>
      ), (
        <span>{`20`} Orders</span>
      )];

    const mobiletotalOrders = [0, 30, 40, 60, 119, 45, 21, 44, 33.5, 45, 32, 45, 35];
    const mobilecancelledOrders = [0, 10, 18, 25, 24, 13, 12, 18, 15.5, 14, 16, 11, 12];

    const computertotalOrders = [0, 120, 43, 63, 51, 99, 48, 117, 62, 77, 23, 42, 90];
    const computercancelledOrders = [0, 17.2, 16.8, 25.2, 14, 23, 35, 12, 15.5, 14, 16, 11, 12];

    const headphonestotalOrders = [0, 56, 25, 111, 52, 45, 43, 26, 35, 67, 79, 41, 22];
    const headphonescancelledOrders = [0, 17, 11, 25, 34, 31, 15, 11, 5, 1, 33, 12];

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        if (event.target.value == 10) { // Mobiles
            setPname('Mobile');
            setChartData({
                totalOrders: mobiletotalOrders,
                cancelledOrders: mobilecancelledOrders,
            });

            const tsum = mobiletotalOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const csum = mobilecancelledOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            console.log("tsum: "+tsum+", csum: "+csum);
            setCountOrders({
                totalOrdersCounts: tsum,
                cancelledOrdersCounts: csum
            })

        } else if (event.target.value == 20) { // Computers
            setPname('Computers');
            setChartData({
                totalOrders: computertotalOrders,
                cancelledOrders: computercancelledOrders,
            });

            const tsum = computertotalOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const csum = computercancelledOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            console.log("tsum: "+tsum+", csum: "+csum);
            setCountOrders({
                totalOrdersCounts: tsum,
                cancelledOrdersCounts: csum
            });

        } else if (event.target.value == 30) { // Headphones
            setPname('Headphones');
            setChartData({
                totalOrders: headphonestotalOrders,
                cancelledOrders: headphonescancelledOrders,
            });
            
            const tsum = headphonestotalOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const csum = headphonescancelledOrders.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            console.log("tsum: "+tsum+", csum: "+csum);
            setCountOrders({
                totalOrdersCounts: tsum,
                cancelledOrdersCounts: csum
            });

            
        } else { // No option selected, set all values to 0
            setChartData({
                totalOrders: Array(12).fill(0),
                cancelledOrders: Array(12).fill(0),
            });

            setCountOrders({
                totalOrdersCounts: 0,
                cancelledOrdersCounts: 0
            });

        }
    };

    const monthLabels = ['0','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const xAxisData = Array.from({ length: monthLabels.length }, (_, index) => index); // Generate [0, 1, 2, ..., 11] for twelve months

    return (
        <ComponentSkeleton>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <AnalyticCharts title="Total Annual Orders" count="1,24,357" percentage={59.3} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <AnalyticCharts title="Total Profit" count="$ 78,250" percentage={70.5}/>
                </Grid>
            </Grid>
            <Grid container marginTop={2}>
                <Grid item xs={12} lg={8}>
                    <MainCard>
                    <Typography variant="h4" color="inherit">
                       Product Analytics
                    </Typography>
                    <LineChart
                        xAxis={[
                            {
                                id: 'defaultized-x-axis-0',
                                data: xAxisData,
                                label: 'Month',
                                valueFormatter: (value) => monthLabels[value], // Display month names as tick labels
                            }
                        ]}
                        series={[
                            {
                                data: chartData.totalOrders,
                                valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                                label: 'Total Order'
                            },
                            {
                                data: chartData.cancelledOrders,
                                valueFormatter: (value) => (value == null ? '?' : value.toString()),
                                label: 'Cancelled Order',
                                color: '#ff4242'
                            },
                        ]}
                        height={200}
                        margin={{ top: 10, bottom: 20 }}
                        {...chartSetting}
                    />
                    </MainCard>
                </Grid>
                <Grid item xs={2} lg={3} marginLeft={2}>
                    <MainCard>
                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                            <InputLabel id="demo-select-small-label">Products</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age}
                                label="Products"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Mobiles</MenuItem>
                                <MenuItem value={20}>Computers</MenuItem>
                                <MenuItem value={30}>Headphones</MenuItem>
                            </Select>
                        </FormControl>
                        <Root style={{color:'black'}}>
                            <Divider>Total Orders of {pname}</Divider>
                                <span style={{display: 'flex', justifyContent: 'center'}}>{countOrders.totalOrdersCounts * 100} </span>
                            <Divider>Cancelled Orders</Divider>
                                <span style={{display: 'flex', justifyContent: 'center'}}>{countOrders.cancelledOrdersCounts * 100}</span>
                        </Root>
                    </MainCard>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
}

export default Analytics;
