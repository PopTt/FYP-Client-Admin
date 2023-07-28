import { Avatar, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

function EventLeftBar(props) {
  const { targetEvent, handleOpenModal, onBack, onSetting } = props;

  return (
    <Card sx={{ position: 'fixed', top: 100, bottom: 0, width: '18%', bgcolor: 'white' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center',width: '100%' }}>
          <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>Back</Button>
          <Typography variant="h5">
            {targetEvent && targetEvent.name}
          </Typography>
          <IconButton onClick={onSetting}>
    <SettingsIcon />
  </IconButton>
        </div>
        <List sx={{ width: '100%', maxWidth: 300 }}>
          {targetEvent && targetEvent.managers.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#3f51b5' }}>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
          Assign Manager
        </Button>
      </CardContent>
    </Card>
  );
}

export default EventLeftBar;