import PropTypes from 'prop-types';

import { Chip, Grid, Stack, Typography } from '@mui/material';

import MainCard from '../../../components/MainCard';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  yAxis: [
    {
      label: 'Thousand Dollars',
    },
  ],
  width: 400,
  height: 200,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};
const dataset = [
  {
    expense: 59,
    revenue: 37,
    month: 'Quarter 1',
  },
  {
    expense: 40,
    revenue: 52,
    month: 'Quarter 2',
  },
  {
    expense: 47,
    revenue: 63,
    month: 'Quarter 3',
  },
  {
    expense: 54,
    revenue: 16,
    month: 'Quarter 4',
  },
];

const valueFormatter = (value: number | null) => `${value}K $`;


function typeOfChart(title){
  const data = [
    { value: 65, label: 'Audio/Video' },
    { value: 27, label: 'Cables' },
    { value: 33, label: 'Parts' },
    { value: 20, label: 'Appliances' },
  ];
  
  const size = {
    width: 400,
    height: 200,
  };
  


  if( title == 'Total Annual Orders'){
    return(
      <PieChart
    series={[
      {
        arcLabel: (item) => `${item.value} %`,
        arcLabelMinAngle: 45,
        data,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray'},
      },
    ]}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        fontWeight: 'light',
      },
    }}
    {...size}
  />
    );
  }else if(title == "Total Profit"){
    return(<BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'expense', label: 'Expense', valueFormatter },
        { dataKey: 'revenue', label: 'Revenue', valueFormatter },
      ]}
      {...chartSetting}
    />);
  }

}

function AnalyticCharts({ color, title, count, percentage, isLoss }) {

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Stack>
          {typeOfChart(title)}
      </Stack>
    </MainCard>
  );
}

AnalyticCharts.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
};

AnalyticCharts.defaultProps = {
  color: 'primary'
};

export default AnalyticCharts;
