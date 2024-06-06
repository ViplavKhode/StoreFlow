import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';

const Products = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Stack spacing={3}>
        <MainCard>
            <Typography variant="h1">Standard Operating Procedure</Typography>
            <Typography variant="body1">
              StoreFlow is a comprehensive Warehouse Management System designed to streamline operations and enhance efficiency in managing inventory and logistics. The system provides a user-friendly interface with procedural guidelines tailored for each key aspect of warehouse management.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Dashboard</Typography>
            <Typography variant="body1">
              The Dashboard serves as the central hub for monitoring key performance indicators (KPIs), such as order fulfillment rates, inventory turnover, and customer satisfaction metrics. It provides real-time insights into warehouse activities, allowing managers to make informed decisions and optimize workflows.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Products</Typography>
            <Typography variant="body1">
              The Products module facilitates efficient management of inventory items, including adding new products, updating existing ones, and categorizing items based on various attributes such as category, location, and availability information. It ensures accurate tracking of stock levels and enables seamless integration with other modules for streamlined operations.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Customers</Typography>
            <Typography variant="body1">
              The Customers module focuses on managing customer information, including contact details, order history, and preferences. It enables warehouse managers to provide personalized services, track customer interactions, and analyze customer behavior to enhance satisfaction and loyalty.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Order</Typography>
            <Typography variant="body1">
              The Order module streamlines the order fulfillment process, from order placement to delivery. It includes features such as order tracking, shipping management, and inventory allocation to ensure timely and accurate order processing. Integration with the Customers module enables easy access to customer data for efficient order management.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Inventory</Typography>
            <Typography variant="body1">
              The Inventory module provides comprehensive visibility and control over warehouse stock, including stock levels, location tracking, and inventory movements. It enables warehouse managers to optimize inventory levels, minimize stockouts, and prevent overstocking through accurate forecasting and demand planning.
            </Typography>
          </MainCard>
          <MainCard>
            <Typography variant="h2">Ticket</Typography>
            <Typography variant="body1">
              The Ticket module offers customizable configurations to adapt the system to the specific needs of the warehouse environment. It includes settings for user permissions, system preferences, and integration with third-party systems. Administrators can tailor the system settings to optimize performance and ensure compliance with organizational policies and industry standards.
            </Typography>
          </MainCard>
          <MainCard>
            <Stack spacing={2}>
              <Typography variant="h1">Customer Reviews</Typography>
              <Typography variant="body1">
                "StoreFlow transformed our warehouse operations, making it a breeze to manage inventory." - Adam
                <br />
                "Impressed by StoreFlow's efficiency and user-friendly interface. A game-changer for our warehouse." - Harold
                <br />
                "StoreFlow streamlines inventory management like no other system we've used. Highly recommended." - Elliot
                <br />
                "Thanks to StoreFlow, tracking inventory is no longer a headache. It's simplified our processes immensely." - Van
                <br />
                "StoreFlow's real-time insights have been invaluable in optimizing our warehouse workflows." - Justine
                <br />
                "With StoreFlow, order fulfillment has never been smoother. It's improved our productivity tenfold." - Robert
                <br />
                "StoreFlow's customizable configurations perfectly fit our warehouse needs. A must-have system." - Sam
                <br />
                "StoreFlow gives us unparalleled control over our stock levels and movements. It's truly a game-changer." - Rick
              </Typography>
            </Stack>
          </MainCard>

          <MainCard>
            <Stack spacing={2}>
              <Typography variant="h1">Contact Us</Typography>
              <Typography variant="body1">
                <strong>Number:</strong> +1(564)-756-8029
                <br />
                <strong>Email:</strong> storeflow@helpdesk.com
                <br />
                <strong>Address:</strong>
                <br />
                <span>Street:</span> 1203 Elm Street
                <br />
                <span>City:</span> Fort Wayne
                <br />
                <span>State:</span> Indiana
                <br />
                <span>ZIP Code:</span> 42701
              </Typography>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Products;
