import React, { useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
const UserFormUI = ({ status, handleAddOrUpdateUser, showUserFields }) => {
  const {
    register,
    watch,
    formState,
    setValue,
    reset,
    control,
  } = useFormContext();

  const role = watch("role");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  useEffect(() => {
    if (role === "admin" || role === "") {
      setValue("semester", "");
      setValue("studentId", "");
    }
  }, [role]);

  const { errors, isDirty, isValid, dirtyFields } = formState;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" component="h1" gutterBottom>
          {status === "Edit" ? "Edit User" : "Add a New User"}
        </Typography>
        <form onSubmit={handleAddOrUpdateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.role}
                    variant="outlined"
                  >
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      label="Role"
                      {...field}
                    >
                      <MenuItem value="">Select An Option</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                    {errors.role && (
                      <FormHelperText>{errors.role?.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Education"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SchoolIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.education}
                    helperText={errors.education && errors.education.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.age}
                    helperText={errors.age && errors.age.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.gender}
                    variant="outlined"
                  >
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      label="Gender"
                      {...field}
                    >
                      <MenuItem value="">Select An Option</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>{errors.gender?.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            {showUserFields === "user" && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="studentId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Student ID"
                        variant="outlined"
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <BadgeIcon />
                            </InputAdornment>
                          ),
                        }}
                        error={dirtyFields.studentId && errors.studentId}
                        helperText={
                          dirtyFields.studentId && errors.studentId?.message
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="semester"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Semester"
                        variant="outlined"
                        {...field}
                        error={!!errors.semester}
                        helperText={errors.semester && errors.semester.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {fields?.map((field, index) => (
              <Grid container item spacing={2} key={field.id}>
                <Grid item xs={5} md={5}>
                  <Controller
                    name={`books.${index}.bookName`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Book Name"
                        type="text"
                        variant="outlined"
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="start">
                        //       <LibraryBooksIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <Controller
                    name={`books.${index}.issueDate`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Issue Date"
                        variant="outlined"
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="start">
                        //       <CalendarTodayIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1.5}>
                  <Button
                    onClick={() => append({ bookName: "", issueDate: "" })}
                    sx={{ mt: 1 }}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
                <Grid item xs={0.5}>
                  {index > 0 && (
                    <IconButton
                      sx={{ mt: 1, color: "#5C9EDF" }}
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || !isDirty}
                >
                  {status === "Edit" ? "Update User" : "Add User"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default UserFormUI;
