import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";

const SignInUI = ({ handleSubmit, register, errors, loading }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Stack spacing={2} width={400}>
        <Typography align="center" variant="h4" component="h2" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="User Name"
              variant="outlined"
              {...register("username")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Sign In"}
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default SignInUI;
