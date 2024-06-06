import React from 'react';
import { Grid, Stack, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Tooltip, Card, CardMedia } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';
import './../../styles/Inventory.css'

const Inventory = () => {
  const lostProducts = [
    {
      name: 'Samsung Mobile Phones', category: 'Electronics ', location: 'Shelf A', status: 'Stock Available', details: 'Samsing Galaxy models present in the rack',
      image: 'https://www.zdnet.com/a/img/resize/df0442de58d37347fe696c1f68b3beab3c798b19/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&width=1280'
    },
    {
      name: 'Apple MacBook', category: 'Electronics', location: 'Shelf B', status: 'Out of Stock', details: 'Apple M1, M2 Mac book Air',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp13-silver-m1-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628621726000'
    },
    {
      name: 'Apple AirPods', category: 'Electronics', location: 'Shelf C', status: 'Order Placed', details: 'Apple AirPods and AirPods Pro',
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6373/6373460_sd.jpg;maxHeight=640;maxWidth=550'
    },
    {
      name: 'Samsung Galaxy S21', category: 'Electronics', location: 'Shelf D', status: 'Stock Available', details: 'Latest Samsung flagship phone',
      image: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-74840/samsunggalaxys21ultra5g.jpg'
    },
    {
      name: 'Sony WH-1000XM4', category: 'Electronics', location: 'Shelf E', status: 'Stock Available', details: 'Premium noise-canceling headphones',
      image: 'https://www.lifewire.com/thmb/hOWC6Uc7krZqDKsovfmZfamlPdQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Sony-WH1000XM4_HeroSquare-1ce779977d1a4485aaef595a72adbfe5.jpg'
    },
    {
      name: 'Amazon Echo Dot', category: 'Electronics', location: 'Shelf F', status: 'Out of Stock', details: 'Smart speaker with Alexa',
      image: 'https://i.insider.com/6334a4ee43e88400185d9d17?width=1000&format=jpeg&auto=webp'
    },
    {
      name: 'Nintendo Switch', category: 'Electronics', location: 'Shelf G', status: 'Stock Available', details: 'Gaming console for home or on-the-go',
      image: 'https://i5.walmartimages.com/seo/Nintendo-Switch-OLED-Model-w-White-Joy-Con_8332cfb1-bb57-4435-bc75-e045449d505d.7bda8b8e558e1b2a49a02a6f15f6beba.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
    },
    {
      name: 'Canon EOS R5', category: 'Electronics', location: 'Shelf H', status: 'Stock Available', details: 'Professional mirrorless camera',
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6420/6420371_sd.jpg;maxHeight=640;maxWidth=550'
    },
    {
      name: 'Dell XPS 13', category: 'Electronics', location: 'Shelf I', status: 'Stock Available', details: 'High-performance laptop',
      image: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/1440x960/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24432609/236524_Dell_XPS_13_AKrales_0016.jpg'
    },
    {
      name: 'Philips Hue Lightstrip', category: 'Electronics', location: 'Shelf J', status: 'Stock Available', details: 'Smart LED light strip',
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6419/6419725_sd.jpg;maxHeight=640;maxWidth=550'
    },
    {
      name: 'Fitbit Charge 4', category: 'Electronics', location: 'Shelf K', status: 'Stock Available', details: 'Fitness tracker with built-in GPS',
      image: 'https://i5.walmartimages.com/seo/Fitbit-Charge-4-NFC-Activity-Tracker-Black-Black_3b5eb492-73da-4c10-9d65-7feb5cb11fda.240128819b22fd29a10d4dc559cc3839.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
    },
    {
      name: 'Bose QuietComfort Earbuds', category: 'Electronics', location: 'Shelf L', status: 'Stock Available', details: 'Wireless noise-canceling earbuds',
      image: 'https://media.gamestop.com/i/gamestop/11158907_triple-black/Bose-QuietComfort-Earbuds-triple-black?$pdp$$&fmt=webp'
    },
    {
      name: 'iPad Pro', category: 'Electronics', location: 'Shelf M', status: 'Stock Available', details: 'Powerful tablet for work and creativity',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-model-select-gallery-2-202212?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1667594167534'
    },
    {
      name: 'Sony PlayStation 5', category: 'Electronics', location: 'Shelf N', status: 'Out of Stock', details: 'Next-gen gaming console',
      image: 'https://i.ytimg.com/vi_webp/_NX8F9FBvg0/maxresdefault.webp'
    },
    {
      name: 'LG OLED CX Series TV', category: 'Electronics', location: 'Shelf O', status: 'Order Placed', details: 'High-end OLED TV',
      image: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/58fd294f-20f2-4674-b5d8-3ff51fa31bd3/md08003934-DZ-1-jpg'
    },
    {
      name: 'Google Pixel 6 Pro', category: 'Electronics', location: 'Shelf P', status: 'Order Placed', details: 'Google\'s latest flagship phone',
      image: 'https://www.cnet.com/a/img/resize/37af5c077fe6b9269039512c0f891e1fa5ed4c70/hub/2023/10/11/6e186c1e-4694-4be3-94c8-434825a926fd/google-pixel-8-pro-review-cnet-10.jpg?auto=webp&fit=crop&height=362&width=644'
    },
    {
      name: 'JBL Flip 5', category: 'Electronics', location: 'Shelf Q', status: 'Stock Available', details: 'Portable waterproof Bluetooth speaker',
      image: 'https://i5.walmartimages.com/seo/JBL-Pulse-5-Portable-Bluetooth-Speaker-with-360-Degree-Light-Show-Black_d2f863d8-4435-4f22-bcfb-9c50f2ed5a5c.0feb3a8f1188bfd7c261a6d7a3109d6b.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
    },
    {
      name: 'Microsoft Surface Laptop 4', category: 'Electronics', location: 'Shelf R', status: 'Out of Stock', details: 'Sleek and powerful laptop',
      image: 'https://cdn0.vox-cdn.com/hermano/verge/product/image/9694/bfarsace_211004_4777_0043_sq.jpg'
    },
    {
      name: 'GoPro Hero 10 Black', category: 'Electronics', location: 'Shelf S', status: 'Stock Available', details: 'Action camera for adventures',
      image: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1361/1440x960/filters:focal(1046x1121:1047x1122):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/19247348/brose_190930_3699_0012.jpg'
    },
    {
      name: 'Apple Watch Series 7', category: 'Electronics', location: 'Shelf T', status: 'Stock Available', details: 'Advanced smartwatch',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/220929110646-apple-watch-series-8-cnn-5.jpg?c=16x9'
    },
    {
      name: 'Raspberry Pi 4', category: 'Electronics', location: 'Shelf U', status: 'Stock Available', details: 'Single-board computer for DIY projects',
      image: 'https://cdn-shop.adafruit.com/970x728/4301-03.jpg'
    }

  ];

  const getStatusColor = (status) => {
    if (status === 'Stock Available') {
      return green[500]
    }
    else if (status === 'Out of Stock') {
      return red[500]
    }
    else {
      return yellow[500]
    }
  };

  const ProductImageCard = ({ image }) => (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia component="img" width="250" height="150" image={image} alt="Product" />
    </Card>
  );

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <MainCard>
              <Stack spacing={1} sx={{ mt: -1.5 }}>
                <Typography variant="h1">Products in Inventory</Typography>
              </Stack>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={12}>
        {/* Table to display lost products */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lostProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell><Tooltip title={<ProductImageCard image={product.image} />} arrow>
                    <span>{product.name}</span>
                  </Tooltip>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>
                    <Box component="span" sx={{display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', bgcolor: getStatusColor(product.status), mr: 1 }} />
                    {product.status}</TableCell>
                  <TableCell>{product.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </ComponentSkeleton>
  );
};

export default Inventory;
