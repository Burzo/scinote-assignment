import { FieldProps, getIn } from 'formik'
import { TextFieldProps, TextField, Chip, Autocomplete } from '@mui/material'

type AutocompleteSelect = {
  numbersOnly: boolean
}

type Props = FieldProps & TextFieldProps & AutocompleteSelect

export const AppAutocomplete = ({ numbersOnly, ...props }: Props) => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form } = props

  return (
    <Autocomplete
      multiple
      options={[]}
      freeSolo
      autoSelect
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      value={field.value}
      onChange={(e: any, newValue: string[], reason, details) => {
        form.setFieldValue(props.field.name, newValue)
      }}
      renderInput={(params) => (
        <TextField
          label={props.label}
          error={error ?? Boolean(isTouched && errorMessage)}
          helperText={
            helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
          }
          {...params}
        />
      )}
    />
  )
}
