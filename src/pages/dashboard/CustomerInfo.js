import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles'; // Import makeStyles from '@mui/styles' if using Material-UI v4 or earlier
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  arrowIcon: {
    cursor: 'pointer',
    marginLeft: '5px',
  },
});

function createData(id, name, phone, email, joindate, ordersum, lastorderdate) {
  return { id, name, phone, email, joindate, ordersum, lastorderdate };
}

export default function BasicTable() {
  const classes = useStyles();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/users/customers/list/';
    fetch(`${url}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);
        setRows(data["customers"])
        // navigate('/dashboard/default');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  const requestSort = (key) => {
    if (!key) return; // Check if key is provided
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (!sortConfig.key) return 0; // Check if key is provided
    if (sortConfig.key === 'id' || sortConfig.key === 'ordersum') {
      return (sortConfig.direction === 'asc' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key]);
    } else if (sortConfig.key === 'lastorderdate') {
      const dateA = new Date(a.lastorderdate);
      const dateB = new Date(b.lastorderdate);
      return (sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA);
    } else {
      return 0;
    }
  });

  const renderArrowIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? <ArrowUpwardIcon className={classes.arrowIcon} /> : <ArrowDownwardIcon className={classes.arrowIcon} />;
    }
    return null;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => requestSort('id')}>ID {renderArrowIcon('id')}</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Date of Joining</TableCell>
            <TableCell align="right" onClick={() => requestSort('ordersum')}>Total Orders {renderArrowIcon('ordersum')}</TableCell>
            <TableCell align="right" onClick={() => requestSort('lastorderdate')}>Last Order Date {renderArrowIcon('lastorderdate')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.joindate}</TableCell>
              <TableCell align="right">{row.ordersum}</TableCell>
              <TableCell align="right">{row.lastorderdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
