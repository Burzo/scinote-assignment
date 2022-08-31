import { FieldProps, getIn } from "formik";
import {
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  RadioGroupProps,
  FormLabelProps,
} from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { RadioProps } from "@mui/material";
import { FormControlProps } from "@mui/material";
import { FormHelperTextProps } from "@mui/material";

type RadioButtons = {
  radioButtons: { label: string; value: number }[];
  label: string;
  defaultValue: string | number;
};

type Props = FieldProps &
  RadioProps &
  RadioGroupProps &
  FormControlProps &
  FormHelperTextProps &
  FormLabelProps &
  RadioButtons;

export const AppRadio = ({ radioButtons, defaultValue, ...props }: Props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { field, form } = props;

  return (
    <FormControl error={isTouched && errorMessage ? true : false} fullWidth>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <RadioGroup
        value={field.value}
        onChange={(e) => {
          form.setFieldValue(
            field.name,
            parseInt((e.target as HTMLInputElement).value)
          );
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
      <FormHelperText error>
        {isTouched && errorMessage ? errorMessage : undefined}
      </FormHelperText>
    </FormControl>
  );
};
