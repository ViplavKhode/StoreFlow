import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './../../styles/ProductList.css'

const columns = [
  { field: 'name', headerName: 'Product Name', flex: 1 },
  { field: 'inventory', headerName: 'Inventory', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: params.value === 'published' ? '#11B981' : 'red', marginRight: 5 }}></div>
        {params.value === 'published' ? 'Published' : 'Not Published'}
      </div>
    )
  },
];


const ProductList = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/products/list/';
    fetch(`${url}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);
        setRows(data["products"])
        // navigate('/dashboard/default');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  return (
   <div className='data_grid_container'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        sx={{
          fontSize: '15px',
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid #E6EBF0', // Change the color as needed
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #E6EBF0' 
          },
        }}
      />
   </div>
      

  );
};

export default ProductList;
