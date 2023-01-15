import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import "./ForgotPassword.css";
import { forgotPassword, VerifyEmail } from "../../api/forgotPassword";
import { resetPassword } from "../../firebase/firebase";
import { useSnackbar } from "notistack";

const theme = createTheme();

function ForgotPassword() {
  const [invalid, setInvalid] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email }) => {
    if (email) {
      forgotPassword({ email }).then((response) => {
        const { status, emailRegistered } = response;
        console.log(response);
        setInvalid(false);
        if (status === "ok" && emailRegistered) {
          handleClickVariant(
            "Password reset link send successfully!",
            "success"
          );

          return;
        }
        setInvalid(true);
      });
    }
  };

  return (
    <div className="email-verify">
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          className="custom-main"
          sx={{ boxShadow: 1 }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "48px",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "#fff", border: "3.7px solid #0f244c" }}
            >
              <MobileFriendlyIcon
                sx={{ fontSize: "1.7rem", fill: "#0f244c" }}
              ></MobileFriendlyIcon>
            </Avatar>
            <Typography component="h1" variant="h5" className="login-title">
              Email Verify
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
              className="inner-body"
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="validate-error">This field is required</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p className="validate-error">Invalid email format</p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
                className="submit-login"
              >
                Send
              </Button>
              <div id="recaptcha-container" />
            </Box>
            {invalid && (
              <Alert sx={{ mt: "2rem" }} severity="error">
                Unregistered email address!
              </Alert>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ForgotPassword;
