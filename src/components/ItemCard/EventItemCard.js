import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { makeStyles } from "@mui/styles";
import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "1rem 0",
    padding: "0.8rem 2rem",
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const EventItemCard = ({ name, description, id, status, face, manager_count, participant_count, org_id }) => {
  const { authState, getEvents } = useContext(AuthContext);
  const styles = useStyles();

  const viewEvents = async () => {
    try {
      await getEvents(id);
      window.location.href = `/organization/event/${org_id}/${id}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ display: 'flex', mb: 4, alignItems: 'center', backgroundColor: '#E7F3FF' }}>
      <EventIcon sx={{ fontSize: 80, p: 4, color: '#3f51b5' }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color={status === "CLOSE" ? 'red' : 'green'}>
            {status}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Managers:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {manager_count}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Participants:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {participant_count}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Attendance Method:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {face}
          </Typography>
        </Box>
      </CardContent>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyItems: 'flex-end', backgroundColor: 'green' }}>
        <Button className={styles.btn} variant="contained" onClick={viewEvents}>
          VIEW
        </Button>
      </div>
    </Card>
  );
};

export default EventItemCard;