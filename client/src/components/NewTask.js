import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { createTask } from "../services/task.api";

/**
 * Renders a form for creating a new task.
 */
export default function NewTask() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const response = await createTask(accessToken, formData);
    console.log(response);
  };

  return (
    <Paper sx={{ m: 3, pt: 2, pb: 2 }}>
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5" component="h3">
              New Task
            </Typography>
          </Grid>
          <Grid item>
            <form action="">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    id="task-title"
                    name="title"
                    label="Title"
                    placeholder="Enter task title"
                    onChange={handleTextChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Enter task description"
                    onChange={handleTextChange}
                    multiline
                    minRows={5}
                    maxRows={Infinity}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Publish
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
