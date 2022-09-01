import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AbsolutePosition } from '../../../components/Loading'

const NoMatchPage = () => {
  const navigate = useNavigate()

  const goHome = () => navigate('/')

  return (
    <AbsolutePosition>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">Oops! Nothing here.</Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button onClick={goHome} variant="contained">
            Go home
          </Button>
        </Grid>
      </Grid>
    </AbsolutePosition>
  )
}

export default NoMatchPage
