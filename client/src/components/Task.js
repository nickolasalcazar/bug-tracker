import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getTaskById } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Component that displays all of the details of a task.
 */
function Task() {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTask = async () => {
    const token = await getAccessTokenSilently();
    return await getTaskById(token, id);
  };

  // Listens for when a task ID is passed
  useEffect(() => {
    console.log(`Task ${id}; fetch its data`);
    getTask().then((response) => {
      console.log(response.data[0]);
      setData(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Typography component="h2">Loading task...</Typography>;

  return (
    <Box>
      <Typography variant="h5" component="h2">
        {data.title}
      </Typography>
      <Typography variant="p" component="p">
        {data.description}
      </Typography>
    </Box>
  );
}

export default Task;
