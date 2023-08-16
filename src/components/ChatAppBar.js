"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import LoginDialog from "@/components/LoginDialog";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/session";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.session.username);
  const [open, setOpen] = useState(false);
  const handleClose = (newUsername) => {
    setOpen(false);
  };

  const handleLogin = async () => {
    if (username) {
      const r = await dispatch(logout());
    }
    setOpen(true);
  };

  return (
    <Box sx={{ justifyContent: "flex-end" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat POC
          </Typography>
          <Typography component="div" sx={{ justifyContent: "flex-end" }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            {username ? <LogoutIcon /> : <LoginIcon />}
          </Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={open} onClose={handleClose} />
    </Box>
  );
}
