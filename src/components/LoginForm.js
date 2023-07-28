import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { loginValidation } from './InputValidation';
import { AuthContext } from '../context/AuthContext';
import { makeStyles } from '@mui/styles';
import { Alert, Typography, Button, TextField, Grid, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  
  inner_container: {
    width: '400px',
    padding: '40px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  
  inputField: {
    marginBottom: '20px',
    position: 'relative',
  },
  
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
  },
  
  input: {
    width: '100%',
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#333',
  },
  
  icon: {
    color: 'green',
  },
  
  errorMsg: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
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

const LoginForm = () => {
    const styles = useStyles();
    const {login, authState} = useContext(AuthContext)
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginValidation,
      onSubmit: (values) => {
        login({values});
      },
    });
  
    const { values, handleChange, handleBlur, errors, touched, isValid, handleSubmit } = formik;
  
    return (
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <div className={styles.inputField}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputContainer}>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={styles.input}
              placeholder="Email"
            />
            {!errors.email && values.email !== '' && (
              <FontAwesomeIcon icon={faCheck} color="green" size="sm" className={styles.icon} />
            )}
            </div>
            {errors.email && touched.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>
  
          <div className={styles.inputField}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputContainer}>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={styles.input}
              placeholder="Password"
            />
            
            {!errors.password && values.password !== '' && (
              <FontAwesomeIcon icon={faCheck} color="green" size="sm" className={styles.icon} />
            )}
            </div>
            {errors.password && touched.password && (
              <span className={styles.errorMsg}>{errors.password}</span>
            )}
          </div>
          {/* <button
            type="submit"
            className={styles.button}
            disabled={!isValid}
            onClick={handleSubmit}
          >
            LOGIN
          </button> */}
          <Button type='submit' className={styles.btn} variant="contained" disabled={!isValid} onClick={handleSubmit}>
          SIGN IN
        </Button>
        </div>
      </div>
    );
  };
  
  export default LoginForm;