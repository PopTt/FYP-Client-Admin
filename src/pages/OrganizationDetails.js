import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
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
  Fade,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventItemCard from "../components/ItemCard/EventItemCard";
import LeftBar from "../components/LeftBar"

const drawerWidth = 540;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    backgroundColor: "white",
  },
  orgListContainer: {
    flexDirection: "column",
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
  },
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
    width: "400px",
  },
}));

function OrganizationDetails() {
  const styles = useStyles();
  const {
    authState,
    orgState,
    eventState,
    createEvent,
    getEvents,
    createManager,
  } = useContext(AuthContext);
  const { org_id, org_name } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [pin, setPin] = useState("");
  const [selectedOption, setSelectedOption] = useState("qr-code");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const targetOrg = orgState.orgs.find((item) => {
    return item._id == org_id;
  });

  useEffect(() => {
    async function fetchEvents() {
      await getEvents(org_id);
    }
    fetchEvents();
  }, [org_id, getEvents]);

  const handleBack = () => {
    window.location.href = `/`;
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenManagerModal = () => {
    setOpenManagerModal(true);
  };

  const handleCloseManagerModal = () => {
    setOpenManagerModal(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCreateEvent = async () => {
    await createEvent({
      name: orgName,
      description: orgDescription,
      invitationPin: pin,
      face: selectedOption === "face-recognition" ? true : false,
      organization: {
        id: org_id,
        name: org_name,
      },
    });
    handleCloseModal();
  };

  const handleCreateMember = async () => {
    await createManager({
      username: username,
      email: email,
      password: password,
      organization_id: org_id,
    });
    handleCloseManagerModal();
  };

  return (
    <div className={styles.container}>
      {targetOrg && <LeftBar targetOrg={targetOrg} handleOpenManagerModal={handleOpenManagerModal} onBack={handleBack}/>}
      
        {/* <div
          style={{
            width: "30%",
            backgroundColor: "white",
            top: 100,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <div>
          {targetOrg && targetOrg.name}
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
        {targetOrg && targetOrg.managers.map((item, index) => (
          <li key={index} style={{ padding: "1rem" }}>
            <AccountCircleIcon sx={{ fontSize: 30, color: '#3f51b5' }}/>
            <span style={{ marginLeft: "1rem" }}>{item.name}</span>
          </li>
        ))}
      </ul>
          
          <Button
            className={styles.btn}
            variant="contained"
            onClick={handleOpenManagerModal}
          >
            Create Manager
          </Button>
        </div> */}

        <div className={styles.orgListContainer}>
          {eventState.events.map((item) => (
            <EventItemCard
              key={item._id}
              name={item.name}
              description={item.description}
              id={item._id}
              org_id={org_id}
              status={item.status ? "OPEN" : "CLOSE"}
              face={item.face ? "Face Verification" : "QR Code Verification"}
              manager_count={item.managers.length}
              participant_count={item.participants.length}
            />
          ))}

          <Button
            className={styles.btn}
            variant="contained"
            onClick={handleOpenModal}
          >
            Create Events
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
                <Typography variant="h5">Create Event</Typography>
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
                <TextField
                  label="Pin"
                  variant="outlined"
                  margin="normal"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  fullWidth
                  required
                  inputProps={{ maxLength: 6 }}
                  error={pin.length > 0 && pin.length < 6}
                  helperText={
                    pin.length > 0 && pin.length < 6
                      ? "Pin must be 6 characters"
                      : ""
                  }
                />
                <RadioGroup
                  aria-label="select option"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    value="face-recognition"
                    control={<Radio />}
                    label="Face Recognition"
                  />
                  <FormControlLabel
                    value="qr-code"
                    control={<Radio />}
                    label="QR Code"
                  />
                </RadioGroup>
                <Button variant="contained" onClick={() => handleCreateEvent()}>
                  Create
                </Button>
              </div>
            </Fade>
          </Modal>

          <Modal
            className={styles.modal}
            open={openManagerModal}
            onClose={handleCloseManagerModal}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openManagerModal}>
              <div className={styles.modalPaper}>
                <Typography variant="h5">Create Manager</Typography>
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  error={!validatePassword(password)}
                  helperText="Password must contain at least 8 characters (1 uppercase, 1 lowercase, 1 number, and 1 special character)"
                />
                <Button
                  variant="contained"
                  onClick={() => handleCreateMember()}
                >
                  Create
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
    </div>
  );
}
export default OrganizationDetails;
