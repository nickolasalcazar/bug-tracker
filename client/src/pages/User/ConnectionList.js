import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";

export default function ConnectionList({ connections }) {
  if (connections === null) return;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {connections.map((user, index) => {
        return (
          <Box key={user.user_id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.nickname} src={user.picture} />
              </ListItemAvatar>
              <ListItemText
                primary={user.nickname}
                secondary={`@${user.username}`}
              />
            </ListItem>
            {index === connections.length - 1 ? null : (
              <Divider variant="inset" component="li" />
            )}
          </Box>
        );
      })}
    </List>
  );
}
