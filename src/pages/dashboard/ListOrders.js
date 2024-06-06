import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Checkbox, Link, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Dot from '../../components/@extended/Dot';


const headCells = [
  {
    id: 'check',
    align: 'left',
    disablePadding: false,
    label: 'Check'
  },
  {
    id: 'date',
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: true,
    label: 'Tracking No'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'customer',
    align: 'right',
    disablePadding: false,
    label: 'Customer'
  },
  {
    id: 'completeStatus',
    align: 'right',
    disablePadding: false,
    label: 'Request Served'
  }
];

const OrderStatus = ({ status }) => {
  console.log("status: ", status)
  let color;
  let title;
  
  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Paid';
      break;
    case 2:
      color = 'error';
      title = 'Cancelled';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [mainCheckboxChecked, setMainCheckboxChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/products/orders/list/';
    fetch(`${url}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);
        setRows(data["orders"])
        // navigate('/dashboard/default');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  const handleMainCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setMainCheckboxChecked(isChecked);
    if (isChecked) {
      const allTrackingNos = rows.map(row => row.trackingNo);
      setSelected(allTrackingNos);
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxChange = (event, trackingNo) => {
    const isChecked = event.target.checked;
    setSelected(prevSelected => {
      if (isChecked) {
        return [...prevSelected, trackingNo];
      } else {
        return prevSelected.filter(item => item !== trackingNo);
      }
    });
  };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={mainCheckboxChecked}
                  onChange={handleMainCheckboxChange}
                />
              </TableCell>
              {headCells.slice(1).map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleCheckboxChange(event, row.trackingNo)}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    {row.date}
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.trackingNo}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="right">{row.customer}</TableCell>
                  <TableCell align="right">
                    <Switch />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
