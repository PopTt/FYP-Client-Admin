import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from "react";

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

const OrganizationItemCard = ({ name, description, id }) => {
  const { authState, getEvents } = useContext(AuthContext);

  const styles = useStyles();

  const viewEvents = async () => {
    try {
      await getEvents(id);
      window.location.href = `/organization/${id}/${name}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ display: "flex", mb: 4, alignItems: "center", backgroundColor: '#E7F3FF' }}>
      <HomeWorkIcon sx={{ fontSize: 80, p: 4, color: "#3f51b5" }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyItems: "flex-end",
          backgroundColor: "green",
        }}
      >
        <Button className={styles.btn} variant="contained" onClick={viewEvents}>
          VIEW
        </Button>
      </div>
    </Card>
  );
};

export default OrganizationItemCard;
