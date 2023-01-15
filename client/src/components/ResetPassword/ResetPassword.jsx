import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import "./ResetPassword.css";

import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import { resetPassword } from "../../api/resetPassword";

const theme = createTheme();

function ResetPassword() {
    const { id, token } = useParams();
  const navigate = useNavigate()
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
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ password }) => {
    if (password) {
      resetPassword("post", id, token, password).then((response) => {
        console.log(response);
        const { status, passwordUpdated } = response;
        if (status === "ok" && passwordUpdated) {
          handleClickVariant("Password Updated successfully!", "success");
          navigate("/login")
          return;
        }
        handleClickVariant("Password not Changed!", "error");
      });
    }
  };

  return (
    <div className="reset-password">
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
              New Password
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
              className="inner-body !w-[100%]"
            >
              <Grid item xs={12} className="!mb-2">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: true,
                    min: 6,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  })}
                />
                {errors?.password?.type === "required" && (
                  <p className="validate-error">This field is required</p>
                )}
                {errors?.password?.type === "pattern" && (
                  <p className="validate-error">
                    Password must contain atleast one letter,number and a
                    special character!
                  </p>
                )}
                {errors?.password?.type === "min" && (
                  <p className="validate-error">
                    Password must have atleast 6 characters!
                  </p>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  {...register("confirmpassword", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors?.confirmpassword?.type === "required" && (
                  <p className="validate-error">This field is required</p>
                )}
                {errors?.confirmpassword?.type === "validate" && (
                  <p className="validate-error">Password not match!</p>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
                className="submit-login"
              >
                Submit
              </Button>
              <div id="recaptcha-container" />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ResetPassword;
