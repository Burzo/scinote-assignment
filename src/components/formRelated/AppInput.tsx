import { FieldProps, getIn } from "formik";
import { TextFieldProps, TextField } from "@mui/material";

type Props = FieldProps & TextFieldProps;

export const AppInput = (props: Props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, form, ...rest } = props;

  return (
    <TextField
      fullWidth
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
    />
  );
};
