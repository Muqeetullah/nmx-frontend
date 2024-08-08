import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Fade,
  Backdrop,
} from "@mui/material";

const PasswordField = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type="password"
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    />
  );
};

const ChangePasswordModal = ({ open, handleClose }) => {
  const { handleSubmit, reset } = useFormContext();

  const onSubmit = (data) => {
    console.log("Password Changed:", data);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordField name="password" label="Password" />
            <PasswordField name="confirmPassword" label="Confirm Password" />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Change Password
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;
