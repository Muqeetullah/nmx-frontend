import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 4, textAlign: "center", borderRadius: 2, maxWidth: 400 }}
      >
        <Typography variant="h2" color="error" gutterBottom>
          403
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          You do not have permission to view this page. Please contact your
          administrator if you believe this is an error.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={handleRedirect}
          sx={{ marginTop: 3, fontSize: "1rem", paddingX: 4 }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default Unauthorized;
