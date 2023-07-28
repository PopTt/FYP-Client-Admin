import { Box, Typography, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#f1f9fb",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  info: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  label: {
    marginRight: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
  },
  value: {
    fontSize: "0.8rem",
  },
  divider: {
    backgroundColor: theme.palette.divider,
    height: 1,
    width: "100%",
  },
  copy: {
    fontSize: "0.8rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
}));

const Footer = () => {
  const styles = useStyles();
  return (
    <Box className={styles.footer}>
      <Stack direction="column" spacing={0} alignItems="center">
        <div className={styles.info}>
          <Typography className={styles.value}>Ho Wai Lun</Typography>
        </div>
        <div className={styles.info}>
          <Typography className={styles.value}>20ACB01430</Typography>
        </div>
        <div className={styles.info}>
          <Typography className={styles.value}>
            alanhoablan@1utar.my
          </Typography>
        </div>
        <div className={styles.divider}></div>
        <Typography className={styles.copy}>
          &copy; FYP@20ACB01430 {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;