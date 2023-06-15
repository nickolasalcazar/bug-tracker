import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveUserIcon from "@mui/icons-material/PersonRemoveRounded";
import OptionsIcon from "@mui/icons-material/MoreVert";
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
    pending: false,
    connected: true,
  },
}) {
  const { acceptConnection, removeConnection } = useConnections();

  // Additional options that are rendered when renderOptions = true.
  const SecondaryActions = ({ user_id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAdd = () => {
      acceptConnection(user_id);
      reloadConnections();
    };

    const handleRemove = () => {
      removeConnection(user_id);
      reloadConnections();
    };

    if (!options.connected && !options.pending) return null;
    return (
      <ListItemSecondaryAction>
        {options.pending ? (
          <>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemove}>
              <RemoveIcon />
            </IconButton>
          </>
        ) : null}
        {options.connected ? (
          <>
            <IconButton onClick={handleClick}>
              <OptionsIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => handleRemove(user_id)} disableRipple>
                <RemoveUserIcon pr={3} />
                <Typography pl={2}>Remove</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </ListItemSecondaryAction>
    );
  };

  // to={`/user/${user.username}`}

  if (!users) return;
  if (users.length === 0) return;
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {users.map((user, index) => {
        return (
          <Box key={user.user_id}>
            <ListItem alignItems="flex-start">
              <Link to={`/user/${user.username}`}>
                <ListItemAvatar>
                  <Avatar alt={user.nickname} src={user.picture} />
                </ListItemAvatar>
              </Link>
              <Link to={`/user/${user.username}`}>
                <ListItemText
                  primary={user.nickname}
                  secondary={`@${user.username}`}
                />
              </Link>
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
