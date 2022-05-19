import Head from "next/head";
import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Modal,
  Link,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/*
 * CSS Styles
 */

// Background image
const AgmoBackgroundImageStyles = {
  backgroundImage: `linear-gradient(to top right, rgba(228, 221, 221, 0.2) 10%, rgba(0, 0, 0, 0.5) 55%), url("/images/banner.jpg")`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100%",
  width: "100%",
};

// Input fields (email, password)
const InputFieldStyles = {
  border: "1px solid #ccc",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "rgba(0, 0, 0, 0.06)",
  "& .MuiInputLabel-root": {
    "&.Mui-focused": { color: "#000" },
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    "&.Mui-focused": { backgroundColor: "transparent" },
  },
};

// Password pop up modal
const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Log In Button
const LogInButtonStyles = {
  backgroundColor: "#000",
  borderRadius: "8px",
  textTransform: "none",
  minWidth: "5rem",
  height: "2.5rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

export default function Home() {
  /*
   *   States
   */

  // Manage what the user types in the input fields
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Manage the visibility of the password field
  const [showPassword, setShowPassword] = useState(false);

  // Manage what if incorrect fields are currently present
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  // Manage if server returns an error after sending fetch/axios request
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  // Manage the checkbox
  const [checkboxInput, setCheckboxInput] = useState(false);

  // Manage the forget password link
  const [passwordModalIsVisible, setPasswordModalIsVisible] = useState(false);

  // Manage the snackbar view
  const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);

  /*
   *   Functions
   */

  // Managing the input fields
  const onChange = (e) => {
    let isValid = true;
    switch (e.target.id) {
      case "email":
        setEmailInput(e.target.value);
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
        if (!isValid) {
          setEmailHelperText("Email entered is not valid");
        } else {
          setEmailHelperText("");
        }
        return;
      case "password":
        setPasswordInput(e.target.value);
        isValid = e.target.value.length >= 4;
        if (!isValid) {
          setPasswordHelperText("Password must be at least 4 characters long");
        } else {
          setPasswordHelperText("");
        }
        return;
      default:
        return;
    }
  };

  // Managing the 'Remember Me' checkbox
  const checkboxHandler = (checkValue) => {
    setCheckboxInput(checkValue);
  };

  // Managing when user clicks on forget password link
  const openPasswordModalHandler = () => {
    setPasswordModalIsVisible(true);
  };

  const closePasswordModalHandler = () => {
    setPasswordModalIsVisible(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarIsVisible(false);
  };

  // Manage when user clicks on password visibility icon
  const handleClickShowPassword = () => {
    setShowPassword(curr => !curr)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  // When user clicks on sign in
  const authHandler = (e) => {
    e.preventDefault();
    setServerErrorMessage("");
    // optional: send request to backend server.
    console.log({ emailInput, passwordInput, checkboxInput });
    // try-catch
    setServerErrorMessage(""); // if error response from server
    setSnackbarIsVisible(true);
  };

  return (
    <React.Fragment>
      {/* Website Metadata */}
      <Head>
        <title>Agmo Assignment</title>
        <meta name='description' content='Pre-Interview Assignment' />
        <link rel='icon' href='/images/agmo-logo.png' />
      </Head>

      {/* Surrounding Container */}
      <Grid container direction={{ xs: "column", md: "row" }}>
        {/* Company Background Image + Logo Section*/}
        <Grid
          item
          container
          sx={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "20vh", md: "100vh" },
          }}
          md={7}>
          <Box
            component='img'
            src='/images/agmo-logo.png'
            alt='Company logo'
            sx={{ position: "absolute" }}
          />
          <Box sx={AgmoBackgroundImageStyles} />
        </Grid>

        {/* Form Inputs Section */}
        <Grid item container md={5}>
          <Grid
            item
            container
            direction='column'
            sx={{
              marginTop: "auto",
              marginRight: "auto",
              marginBottom: "auto",
              marginLeft: { xs: "auto", md: "3rem" },
            }}
            width={{ xs: "80%", lg: "70%" }}>
            <Box component='form' autoComplete='off' noValidate onSubmit={authHandler}>
              {/* Title + Subtitle */}
              <Grid item sx={{ marginTop: "2rem", marginBottom: "3rem" }}>
                <Typography variant='h3'>Hello,</Typography>
                <Typography variant='h3'>Welcome Back</Typography>
              </Grid>

              {/* Email Field */}
              <Grid item sx={{ marginBottom: "1.5rem" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon
                    fontSize='large'
                    sx={{ color: "#000", mr: 1, my: !!emailHelperText ? 3 : 0.5 }}
                  />
                  <TextField
                    sx={InputFieldStyles}
                    InputProps={{ disableUnderline: true }}
                    margin='dense'
                    label='Email Address'
                    id='email'
                    variant='filled'
                    value={emailInput}
                    onChange={onChange}
                    fullWidth
                    error={!!emailHelperText}
                    helperText={emailHelperText}
                  />
                </Box>
              </Grid>

              {/* Password Field */}
              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PasswordIcon
                    fontSize='large'
                    sx={{ color: "#000", mr: 1, my: !!passwordHelperText ? 3 : 0.5 }}
                  />
                  <TextField
                    sx={InputFieldStyles}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    margin='dense'
                    label='Password'
                    id='password'
                    variant='filled'
                    value={passwordInput}
                    onChange={onChange}
                    fullWidth
                    error={!!passwordHelperText}
                    helperText={passwordHelperText}
                  />
                </Box>
              </Grid>

              {/* Checkbox + Forgot Password Section */}
              <Grid
                item
                container
                justifyContent='space-between'
                alignItems='center'
                marginBottom='3rem'>
                <Grid item marginLeft={{ xs: "4px", md: "8px" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color='default'
                          onChange={(e) => checkboxHandler(e.target.checked)}
                        />
                      }
                      label={<Typography variant='body2'>Remember Me</Typography>}
                    />
                  </FormGroup>
                </Grid>
                <Grid item marginRight={{ xs: "4px", md: "8px" }}>
                  {/* Forgot Password Link */}
                  <Link
                    component='button'
                    type="button"
                    variant='body2'
                    onClick={openPasswordModalHandler}
                    underline='none'
                    sx={{ color: "common.black", "&:hover": { color: "common.mainBlue" } }}>
                    Forget Your Password?
                  </Link>

                  {/* Pop up modal when user clicks on forget password link */}
                  <Modal
                    open={passwordModalIsVisible}
                    onClose={closePasswordModalHandler}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={ModalStyle}>
                      <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Forgot Password?
                      </Typography>
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ab.
                        Quo, quisquam ex accusamus totam sunt harum asperiores necessitatibus
                        provident reprehenderit
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "1rem",
                        }}>
                        <Button variant='text' color='error' onClick={closePasswordModalHandler}>
                          CLOSE
                        </Button>
                        <Button
                          variant='text'
                          color='info'
                          onClick={() => {
                            closePasswordModalHandler();
                            setServerErrorMessage("Failed to reset password");
                          }}>
                          Generate Example Server Error
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>
              </Grid>

              {/* Submit Form Section */}
              <Grid item container justifyContent='space-between' alignItems='center'>
                {/* Log In Button */}
                <Grid item>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={LogInButtonStyles}
                    disabled={
                      !emailInput || !!emailHelperText || !passwordInput || !!passwordHelperText
                    }>
                    Log In
                  </Button>
                </Grid>
                {serverErrorMessage && (
                  <Grid item marginRight='0.5rem'>
                    <Typography variant='body2' color='red' textAlign='right'>
                      {serverErrorMessage}
                    </Typography>
                  </Grid>
                )}
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  open={snackbarIsVisible}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}>
                  <Alert severity='success'>Printed user inputs to the console</Alert>
                </Snackbar>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
