import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import Axios from "../../axios/axios";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#ffffffc9" align="center" {...props}>
      {"Copyright © "}
      <Link to="/" className="a-link">
        Shopify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ user, url }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (loginData) => {
    if (user) {
      Axios.post(url, loginData)
        .then(({ data }) => {
          if (data.user) {
            document.cookie = `token=${data.token}`;
            document.cookie = `refreshToken=${data.refreshToken}`;
            navigate("/");
            return;
          } else if (data.status === "error" && data.error === "userBlocked") {
            handleClickVariant("Your account is temporarly blocked!","error")
            return
          }
          setInvalid(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.post(url, loginData)
        .then(({ data }) => {
          if (data.admin) {
            document.cookie = `adminToken =${data.token}`;
            navigate("/dashboard");
            return;
          }
          setInvalid(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  return (
    <div className="login-user">
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
              padding: "22px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0f244c" }}>
              <AccountCircleIcon
                sx={{ fontSize: "2.5rem" }}
              ></AccountCircleIcon>
            </Avatar>
            <Typography component="h1" variant="h5" className="login-title">
              {user ? "Login" : "AdminLogin"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
              className="inner-body"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  max: -1,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <span className="validate-error">This field is required</span>
              )}
              {errors?.email?.type === "max" && (
                <span className="validate-error">Invalid email format</span>
              )}
              {errors?.email?.type === "pattern" && (
                <span className="validate-error">Invalid email format</span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password?.type === "required" && (
                <>
                  <span className="validate-error">This field is required</span>
                  <br />
                </>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {user && (
                <Link to="/otp_login" className="a-link">
                  OTP Login
                </Link>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
                className="submit-login"
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link className="a-link">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" className="a-link">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {invalid && (
            <Alert sx={{ mt: 1 }} severity="error">
              Invalid username or password!
            </Alert>
          )}
          <Copyright sx={{ mt: 2, p: 3 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
