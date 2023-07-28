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
  FormLabel,
} from "@mui/material";
import EventLeftBar from "../components/EventLeftBar";
import BasicTable from "../components/Table";

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
    width: "50%",
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

function EventDetails() {
  const styles = useStyles();
  const {
    authState,
    orgState,
    eventState,
    assignManager,
    createEvent,
    getEvents,
    createManager,
    openEvent,
    closeEvent,
    openFace,
    closeFace,
  } = useContext(AuthContext);
  const { org_id, event_id } = useParams();

  const targetOrg = orgState.orgs.find((item) => {
    return item._id == org_id;
  });

  const targetEvent = eventState.events.find((item) => {
    return item._id == event_id;
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedManagerName, setSelectedManagerName] = useState("");
  const [eventStatus, setEventStatus] = useState(
    targetEvent && targetEvent.status
  );
  const [faceMethod, setFaceMethod] = useState(targetEvent && targetEvent.face);
  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      await getEvents(org_id);
    }
    fetchEvents();
  }, [org_id, getEvents]);

  const handleAssignManager = async () => {
    await assignManager({
      event_id: event_id,
      manager_id: selectedManager,
      manager_name: selectedManagerName,
      admin_id: authState.id,
    });
  };

  const handleSettings = async () => {
    if(eventStatus !== targetEvent.status){
      if(eventStatus === 'true'){
        await openEvent(event_id)
      }else{
        await closeEvent(event_id)
      }
    }
    
    if(faceMethod !== targetEvent.face){
      if(faceMethod === 'true'){
        await openFace(event_id)
      }else{
        await closeFace(event_id)
      }
    }
    
    
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSetting = () => {
    handleOpenSettingModal()
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenSettingModal = () => {
    setOpenSettingModal(true)
  };

  const handleCloseSettingModal = () => {
    setOpenSettingModal(false)
  };

  const handleOptionChange = (event) => {
    setSelectedManager(
      event.target.value.substring(0, event.target.value.indexOf(" "))
    );
    setSelectedOption(event.target.value);
    //window.alert(event.target.value.substring(event.target.value.indexOf(' ') + 1))
    setSelectedManagerName(
      event.target.value.substring(event.target.value.indexOf(" ") + 1)
    );
  };

  return (
    <div className={styles.container}>
      {targetOrg && (
        <EventLeftBar
          targetEvent={targetEvent}
          handleOpenModal={handleOpenModal}
          onBack={handleBack}
          onSetting={handleSetting}
        />
      )}

      <div className={styles.orgListContainer}>
        {targetEvent && (
          <BasicTable
            data={targetEvent.participants}
            filename={targetEvent.name}
          />
        )}
        <Modal
          className={styles.modal}
          open={openSettingModal}
          onClose={handleCloseSettingModal}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openSettingModal}>
            <div className={styles.modalPaper}>
              <Typography variant="h5">
                Settings
              </Typography>
              <FormLabel component="legend">Event Status</FormLabel>
              <RadioGroup
                aria-label="Event Status"
                value={eventStatus}
                onChange={(event) => setEventStatus(event.target.value)}
              >
                
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='OPEN'
                      />

<FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='CLOSE'
                      />
              </RadioGroup>

              <FormLabel component="legend">Face Verification Method</FormLabel>
              <RadioGroup
                aria-label="Face Verification Method"
                value={faceMethod}
                onChange={(event)=> setFaceMethod(event.target.value)}
              >
                
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='OPEN'
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='CLOSE'
                      />
              </RadioGroup>
              <Button variant="contained" onClick={() => handleSettings()}>
                Apply
              </Button>
            </div>
          </Fade>
        </Modal>

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
              <Typography variant="h5">
                Assign Manager to {targetEvent && targetEvent.name}
              </Typography>
              <RadioGroup
                aria-label="select Manager"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {targetOrg &&
                  targetEvent &&
                  targetOrg.managers
                    .filter(
                      (item) =>
                        !targetEvent.managers.some(
                          (e_item) => e_item.id === item.id
                        )
                    )
                    .map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id + " " + item.name}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
              </RadioGroup>
              <Button variant="contained" onClick={() => handleAssignManager()}>
                Assign
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
export default EventDetails;
