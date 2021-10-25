import { TextField } from '@mui/material';

export function FormField(props) {
  const { formik, name } = props;
  return (
    <TextField
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      margin="normal"
      fullWidth
      {...props}
    />
  );
}
