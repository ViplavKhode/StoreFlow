import React, { useState } from 'react';
import { Grid,  Stack, Typography } from '@mui/material';
import ComponentSkeleton from './../components-overview/ComponentSkeleton';
import MainCard from '../../components/MainCard';
import './../../styles/Product.css'
import ProductList from './ProductList'
import ProductCreate from './ProductCreate'

const Products = () => {
    const [isCreateProductClicked, setIsCreateProductClicked] = useState(false);

    const handleCreateProductClick = () => {
        setIsCreateProductClicked(true);
    };

    return(
        <ComponentSkeleton>
            {
                isCreateProductClicked ? (
                    <ProductCreate />
                ) : (
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={10}>
                            <h1>Product List</h1>
                        </Grid>
                        <Grid item xs={2} className='create_product_button'>
                            <button onClick={handleCreateProductClick}>+ New Product</button>
                        </Grid >
                        <Grid item xs={11}>
                            <ProductList />
                        </Grid>
                    </Grid>
                    
                )
                
            }     
        </ComponentSkeleton>
)};

export default Products;
