import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, TextField, Button } from "@mui/material";

// Validation Schema using Yup
const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Password Changed:", data);
    reset(); // Reset form fields after submission
  };

  return (
    <div className="flex w-full justify-center items-center h-screen ">
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" align="center">
          Change Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ChangePasswordForm;
