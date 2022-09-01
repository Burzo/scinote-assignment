import { FormLabel, RadioGroup, Radio } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { FormControl } from '@mui/material'

type RadioButtons = {
  radioButtons: { label: string; value: number | string }[]
  label: string
  value: number | string
  onChange: (value: number | string) => void
  disabled?: boolean
}

type Props = RadioButtons

export const AppRadio = ({
  value,
  onChange,
  radioButtons,
  disabled,
  ...props
}: Props) => {
  return (
    <FormControl disabled={disabled} fullWidth>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <RadioGroup
        row
        value={value}
        onChange={(e) => {
          if (typeof value === 'number') {
            onChange(parseInt((e.target as HTMLInputElement).value))
          } else {
            onChange((e.target as HTMLInputElement).value)
          }
        }}
      >
        {radioButtons.map(({ value, label }, i) => (
          <FormControlLabel
            key={i}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
