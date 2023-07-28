import { Avatar, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function LeftBar(props) {
  const { targetOrg, handleOpenManagerModal, onBack } = props;

  return (
    <Card sx={{ position: 'fixed', top: 100, bottom: 0, width: '18%', bgcolor: 'white' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100%' }}>
          <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>Back</Button>
          <Typography variant="h6">
            {targetOrg && targetOrg.name}
          </Typography>
        </div>
        <List sx={{ width: '100%', maxWidth: 300 }}>
          {targetOrg && targetOrg.managers.map((item, index) => (
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
        <Button variant="contained" onClick={handleOpenManagerModal} sx={{ mt: 2 }}>
          Create Manager
        </Button>
      </CardContent>
    </Card>
  );
}

export default LeftBar;