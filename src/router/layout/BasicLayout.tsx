import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, Container } from "@mui/material";

const AVOID_SCROLLBAR = {
  marginLeft: "calc(100vw - 100%)",
  marginRight: 0,
};

export const BasicLayout = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar
          sx={{
            justifyContent: {
              xs: "center",
              sm: "unset",
            },
          }}
        >
          <RocketLaunchIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" textAlign="center">
            Scinote Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 6, ...AVOID_SCROLLBAR }}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};
