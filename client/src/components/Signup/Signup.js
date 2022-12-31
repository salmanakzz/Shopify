import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import Axios from "../../axios/axios";
import Alert from "@mui/material/Alert";

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

export default function Signup({ url }) {
  const navigate = useNavigate();

  const [exists, setExists] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (registerData) => {
    registerData && delete registerData.confirmpassword;
    Axios.post(url, registerData).then(({ data }) => {
      if (data.error === "Duplicate email") {
        setExists("email");
        return;
      } else if (data.error === "Duplicate mobile") {
        setExists("mobile");
        return
      }
      navigate("/login");
    });
  };

  return (
    <div className="signup-user">
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
              Signup
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
              className="inner-body"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("firstname", {
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.firstname?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.firstname?.type === "maxLength" && (
                    <p className="validate-error">
                      First name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.firstname?.type === "pattern" && (
                    <p className="validate-error">
                      Alphabetical characters only
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    {...register("lastname", {
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.lastname?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.lastname?.type === "maxLength" && (
                    <p className="validate-error">
                      Last name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.lastname?.type === "pattern" && (
                    <p className="validate-error">
                      Alphabetical characters only
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email", {
                      required: true,
                      max: -1,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.email?.type === "max" && (
                    <p className="validate-error">Invalid email format</p>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <p className="validate-error">Invalid email format</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    <p className="validate-error">
                      Invalid mobile number format
                    </p>
                  )}
                  {errors?.mobile?.type === "maxLength" && (
                    <p className="validate-error">
                      Number contains only 10 numbers
                    </p>
                  )}
                </Grid>

                <Grid item xs={12}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submit-signup"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" className="a-link">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {exists && (
            <Alert sx={{ mt: 1 }} severity="error">
              {exists === "email"
                ? "Email address already exists!"
                : exists === "mobile"
                ? "Mobile number already exists!"
                : "Something went wrong!"}
            </Alert>
          )}
          <Copyright sx={{ mt: 2, p: 3 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
