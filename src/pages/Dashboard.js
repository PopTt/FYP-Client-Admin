import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { makeStyles } from "@mui/styles";
import {
  Alert,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import OrganizationItemCard from "../components/ItemCard/OrganizationItemCard";

const drawerWidth = 540;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: "white",
  },
  orgListContainer: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px'
  },
  btn: {
    margin: "1rem",
    padding: "0.8rem 2rem",
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    width: '400px'
  },
}));

function Dashboard() {
  const styles = useStyles();
  const { authState, orgState, createOrg } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateOrg = async () => {
    await createOrg({
      name: orgName,
      description: orgDescription,
      admin: {
        id: authState.id
      }
    });
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.orgListContainer}>
        {orgState.orgs.map((item) => (

          <OrganizationItemCard
            key={item._id}
            name={item.name}
            description={item.description}
            id={item._id}
          />
        ))}

        <Button className={styles.btn} variant="contained" onClick={handleOpenModal}>
          Create Organization
        </Button>

        <Modal
          className={styles.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={styles.modalPaper}>
              <Typography variant="h5">Create Organization</Typography>
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Description"
                variant="outlined"
                margin="normal"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button variant="contained" onClick={() => handleCreateOrg()}>Create</Button>
            </div>
          </Fade>
          </Modal>
          </div>
    </div>
  );
}
export default Dashboard;