import React, { useState } from "react";
import "./NumberVerify.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import Axios from "../../axios/axios";
import Alert from "@mui/material/Alert";
import { Modal } from "@mui/material";
import OtpVerify from "../OtpVerify/OtpVerify";
import { VerifyNumber } from "../../api/VerifyNumber";

const theme = createTheme();

function NumberVerify() {
  const [invalid, setInvalid] = useState(false);
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (mobile) => {
    if (mobile) {
      VerifyNumber(mobile).then((result) => {
        console.log(result);
        const { status, numberRegistered, request_id, userDetails } = result;
        if (status === "ok" && numberRegistered) {
          setUserDetails(userDetails);
          setRequestId(request_id);
          setInvalid(false);
          setOpen(true);
          return;
        }
        setInvalid(true);
      });
    }
  };

  return (
    <div className="number-verify">
      {open && <OtpVerify requestId={requestId} userDetails={userDetails} />}
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
              Number Verify
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
                id="mobile"
                label="Mobile Number"
                name="mobile"
                autoComplete="mobile"
                {...register("mobile", {
                  required: true,
                  pattern:
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  maxLength: 10,
                })}
              />
              {errors?.mobile?.type === "required" && (
                <p className="validate-error">This field is required</p>
              )}
              {errors?.mobile?.type === "pattern" && (
                <p className="validate-error">Invalid mobile number format</p>
              )}
              {errors?.mobile?.type === "maxLength" && (
                <p className="validate-error">
                  Number contains only 10 numbers
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
                className="submit-login"
              >
                Check
              </Button>
            </Box>
            {invalid && (
              <Alert sx={{ mt: "2rem" }} severity="error">
                Unregistered mobile number!
              </Alert>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default NumberVerify;
