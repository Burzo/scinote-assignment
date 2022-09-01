import { Suspense } from 'react'

import './App.scss'
import { Box, BoxProps, styled } from '@mui/system'
import { Loading } from './components/Loading'
import { AppRouter } from './router'

export const AppWrapper = styled(Box)<BoxProps>(() => ({
  position: 'relative',
  height: '100vh',
}))

function App() {
  return (
    <AppWrapper>
      <Suspense fallback={<Loading absolute={true} />}>
        <AppRouter />
      </Suspense>
    </AppWrapper>
  )
}

export default App
