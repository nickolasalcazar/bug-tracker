import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useConnections from "../../hooks/useConnections";

/**
 * Renders a list of users.
 * @param {array}    users              Array containing user data.
 * @param {function} reloadConnections  Callback for reloading state.
 * @param {object}   options            Options.
 */
export default function UserList({
  users,
  reloadConnections,
  options = {
    manageStatus: false,
    viewProfile: true,
  },
}) {
  const { acceptConnection, removeConnection } = useConnections();

  // Additional options that are rendered when renderOptions = true.
  const SecondaryActions = ({ user_id }) => {
    const handleAdd = () => {
      acceptConnection(user_id);
      reloadConnections();
    };

    const handleRemove = () => {
      removeConnection(user_id);
      reloadConnections();
    };

    return (
      <ListItemSecondaryAction>
        {options.manageStatus ? (
          <>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemove}>
              <RemoveIcon />
            </IconButton>
          </>
        ) : null}
        {options.viewProfile ? (
          <Button color="secondary" variant="outlined" size="small">
            Profile
          </Button>
        ) : null}
      </ListItemSecondaryAction>
    );
  };

  if (!users) return;
  if (users.length === 0) return;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {users.map((user, index) => {
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
              <SecondaryActions user_id={user.user_id} />
            </ListItem>
            {index === users.length - 1 ? null : (
              <Divider variant="inset" component="li" />
            )}
          </Box>
        );
      })}
    </List>
  );
}
