import { Grid, Stack, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';

const Settings = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Stack spacing={3}>
          <MainCard>
            <Stack spacing={1} sx={{ mt: -1.5 }}>
              <TicketForm />
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

const TicketForm = () => {
  const [ticketText, setTicketText] = useState('');
  const [ticketType, setTicketType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Ticket Type: ${ticketType}, Ticket Text: ${ticketText}`);
    setTicketType('');
    setTicketText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Raise a Ticket</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Ticket Type" variant="outlined" fullWidth value={ticketType} onChange={(e) => setTicketType(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" variant="outlined" fullWidth multiline rows={4} value={ticketText} onChange={(e) => setTicketText(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary"> Submit Ticket </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const TicketCard = ({ ticket }) => (
  <Card>
    <CardContent>
      <Typography variant="h3">Ticket Type: {ticket.type}</Typography>
      <Typography variant="body1">Description: {ticket.description}</Typography>
    </CardContent>
  </Card>
);

const TicketTracker = () => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  return (
    <Stack spacing={2}>
      <TicketForm addTicket={addTicket} />
      {tickets.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
    </Stack>
  );
};

export default Settings;
