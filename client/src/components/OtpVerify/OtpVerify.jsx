import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VerifyOTP } from "../../api/VerifyOtp";
import "./OtpVerify.css";

function OtpVerify({ userDetails, confirmObj }) {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onVerify = async ({ otp }) => {
    if (otp) {
      try {
        await confirmObj.confirm(otp);
        VerifyOTP(userDetails).then((result) => {
          console.log(result);
          const { refreshToken, token, status, otpVerified } = result;
          if (status === "ok" && otpVerified) {
            document.cookie = `token=${token}`;
            document.cookie = `refreshToken=${refreshToken}`;
            navigate("/");
            return;
          }
          setInvalid(true);
        });
      } catch (error) {
        setInvalid(true);
        console.log(error);
      }
    }
  };
  return (
    <div className="otp-verify">
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="otp-verify-modal">
          <Typography component="h1" variant="h5" className="login-title">
            OTP Verify
          </Typography>
          <TextField
            required
            fullWidth
            sx={{ marginTop: ".7rem" }}
            id="otp"
            label="Enter OTP"
            name="otp"
            autoComplete="otp"
            {...register("otp", {
              required: true,
            })}
          />
          {errors?.otp?.type === "required" && (
            <p className="validate-error">This field is required</p>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#0f244c" }}
            className="submit-login"
            onClick={handleSubmit(onVerify)}
          >
            Verify
          </Button>
          {invalid && (
            <Alert sx={{ mt: "0rem" }} severity="error">
              Invalid OTP!
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default OtpVerify;
