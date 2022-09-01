import { Divider } from '@mui/material'
import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'
import { useState } from 'react'
import { TableType } from '../generator/types'

interface WellBoxProps extends BoxProps {
  backgroundColor: string
  show: boolean
}

const WellBox = styled(Box, {
  shouldForwardProp: (prop) =>
    !['backgroundColor', 'show'].includes(prop as string),
})<WellBoxProps>(({ backgroundColor, show, theme }) => ({
  position: 'relative',
  backgroundColor,
  width: '45px',
  height: '45px',
  borderRadius: theme.shape.borderRadius,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  overflow: show ? 'visible' : 'hidden',
  zIndex: show ? 100 : 0,
  border: '1px solid lightgrey',
}))

const AbsoluteWellBox = styled(WellBox, {
  shouldForwardProp: (prop) =>
    !['show', 'backgroundColor'].includes(prop as string),
})<WellBoxProps>(({ show, backgroundColor }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transition: '.3s width',
  transform: 'translate(-50%, -50%) ',
  height: '45px',
  backgroundColor: 'white',
  padding: '-1px',
  paddingLeft: show ? '10px' : '0',
  paddingRight: show ? '10px' : '0',
  width: show ? 'auto' : '0',
  minWidth: show ? '45px' : '0',
  border: show ? `1px solid ${backgroundColor}` : 'none',
}))

const CustomTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 8,
  position: 'absolute',
  bottom: '0',
  right: '5%',
  transform: 'translate(0, 0)',
}))

type Props = {
  well: TableType
}
export const Well = ({ well }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!well) {
    return (
      <WellBox
        sx={{ cursor: 'inherit' }}
        show={false}
        backgroundColor={'lightgrey'}
      ></WellBox>
    )
  }

  return (
    <WellBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      show={isHovered}
      backgroundColor={well.color + 'bf'}
    >
      <Typography sx={{ fontSize: 10 }} variant="caption">
        {well.sample}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Typography sx={{ fontSize: 10 }} variant="caption">
        {well.reagent}
      </Typography>
      <CustomTypography variant="caption">{well.place}</CustomTypography>
      <AbsoluteWellBox show={isHovered} backgroundColor={well.color}>
        <Typography sx={{ fontSize: 10 }} variant="caption">
          {well.sample}
        </Typography>
        <Divider
          sx={{
            width: '100%',
            backgroundColor: isHovered ? well.color : 'inherit',
          }}
        />
        <Typography sx={{ fontSize: 10 }} variant="caption">
          {well.reagent}
        </Typography>
        <CustomTypography variant="caption">{well.place}</CustomTypography>
      </AbsoluteWellBox>
    </WellBox>
  )
}
