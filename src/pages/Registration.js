import React from "react";
import RegisterForm from "../components/RegisterForm";
import { makeStyles } from "@mui/styles";
import { Alert, Typography, Button, TextField, Grid, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  subtitle: {
    fontSize: '30px !important',
    fontWeight: 'bold !important',
    marginBottom: '40px !important',
    color: '#064C7F',
    textAlign: 'center',
    fontFamily: "Roboto !important",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  link: {
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    margin: "5px"
  },
}));

function Registration() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Box className={styles.formContainer}>
        <Typography className={styles.subtitle}>Sign up a new account</Typography>
        <RegisterForm />
        {/* <Button className={styles.btn} variant="contained">
          Login
        </Button> */}
        <Link to="/login" className={styles.link}>
          Already have an account? Click here to sign in
        </Link>
      </Box>
    </div>
  );
}

export default Registration;