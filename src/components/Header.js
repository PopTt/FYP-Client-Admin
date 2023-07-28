import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
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
}));

const Header = () => {
  const styles = useStyles();
  const { authState, logout } = useContext(AuthContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        padding: "10px",
        paddingInline: "30px",
        backgroundColor: "#f1f9fb",
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
      <AdminPanelSettingsIcon sx={{ fontSize: 45, color: '#3f51b5' }} />
        SEATS
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack
          direction="column"
          spacing={0}
          alignItems="center"
          sx={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" component="span" fontWeight="bold" mr={0}>
            {authState.username}
          </Typography>
          <Typography variant="subtitle1" component="span" mr={0}>
            {authState.email}
          </Typography>
        </Stack>
        <Button className={styles.btn} variant="contained" onClick={logout}>
          LOG OUT
        </Button>
      </Stack>
    </Box>
  );
};

export default Header;
