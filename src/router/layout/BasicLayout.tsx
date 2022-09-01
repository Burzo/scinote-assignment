import { Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box } from '@mui/material'

const AVOID_SCROLLBAR = {
  marginLeft: 'calc(100vw - 100%)',
  marginRight: 0,
}

export const BasicLayout = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar
          sx={{
            justifyContent: 'center',
          }}
        >
          <RocketLaunchIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" textAlign="center">
            Scinote Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 3, ...AVOID_SCROLLBAR }}>
        <Outlet />
      </Box>
    </>
  )
}
