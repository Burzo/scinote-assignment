import { styled } from '@mui/system'
import { Paper, PaperProps } from '@mui/material'

export const AppPaper = styled(Paper)<PaperProps>(({ theme }) => {
  return {
    padding: theme.spacing(3),
    width: '100%',
    elevation: 3,
  }
})
