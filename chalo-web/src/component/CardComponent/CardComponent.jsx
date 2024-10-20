import * as React from 'react';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRoutes } from '../RouteContext';

export default function CardComponent({route}) {
  const { deleteRoute } = useRoutes()

  return (
    <Card sx={{ width: 345, height: 225 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {route.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Source: {route.origin.label}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Destination: {route.destination.label}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {route.status} Route
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {route.direction} Direction
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/routes/${route.id}`}>
          <Button size="small">View</Button>
        </Link>
        <Link to={`/edit/${route.id}`}>
          <Button size="small">Edit</Button>
        </Link>
          <Button onClick={() => deleteRoute(route.id)} size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}