import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";

import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/session";

const LoginDialog = (props) => {
  const { onClose, open } = props;
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(login(username));
    setUsername("");
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Login</DialogTitle>
      <Box sx={{ p: 5 }}>
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="contained" onClick={handleClose}>
          Login
        </Button>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
