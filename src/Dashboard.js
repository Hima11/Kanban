import Kanban from './Kanban';
import './App.css';
import {Box, Card, CardActions, CardContent, CardHeader, Button, TextField, Divider, IconButton, Menu, MenuItem, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = props => {
  const navigate = useNavigate();

  return (
    <Box sx={{maxWidth: '25%', marginTop: 2, marginLeft: 2}}>
      <Card onClick={() => navigate("/kanban")}>
        <CardHeader title='Kanban'></CardHeader>
        <CardMedia
          component="img"
          height="194"
          image="kanban.png"
          alt="Paella dish"
        />
      </Card>
    </Box>
  );
}

export default Dashboard;