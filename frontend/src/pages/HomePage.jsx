import { Alert, Button, CircularProgress, Link, MenuItem, Slider, Snackbar, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { httpService } from '../services/http.service';

const validationSchema = yup.object({
  email: yup.string('Enter your email address').email('Enter a valid email address').required('Email is required'),
  website: yup
    .string('Enter your website address')
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter a valid website address'
    ),
  linkedin: yup
    .string('Enter your linkedIn profile address')
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter a valid linkedIn profile address'
    ),
});

const FormField = props => {
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
};

export function HomePage(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [marketersCount, setMarketersCount] = useState(0);

  useEffect(() => {
    httpService.get('marketer').then(marketers => setMarketersCount(marketers.length));
  }, []);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const onSubmit = async values => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await httpService.post('marketer', values);
      props.history.push('/thankyou?data=' + JSON.stringify(values));
    } catch (err) {
      setIsSubmitting(false);
      setError(err.response.data.err || 'An error occured while submitting the form');
      setIsSnackbarOpen(true);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      website: '',
      linkedin: '',
      yearsExp: '',
      biggestCampaign: 1000,
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <main className="home-page">
      <h1>Marketers</h1>
      {marketersCount && <p>{marketersCount} marketers have joined so far!</p>}
      <form onSubmit={formik.handleSubmit}>
        <FormField formik={formik} name="firstName" label="First name" />
        <FormField formik={formik} name="lastName" label="Last name" />
        <FormField formik={formik} name="email" label="Email address" />
        <FormField formik={formik} name="website" label="Website address" />
        <FormField formik={formik} name="linkedin" label="LinkedIn profile address" />
        <FormField
          formik={formik}
          name="yearsExp"
          label="How many years of experience do you have with Facebook Marketing?"
          select>
          <MenuItem value="no-exp">No experience</MenuItem>
          <MenuItem value="0-1">0-1 years</MenuItem>
          <MenuItem value="1-2">1-2 years</MenuItem>
          <MenuItem value="2-or-more">2 or more years</MenuItem>
        </FormField>
        <div className="slider-container flex column">
          <label htmlFor="">What was the biggest campaign budget you have managed in a single month?</label>
          <Slider
            className="slider"
            name="biggestCampaign"
            defaultValue={1000}
            min={1000}
            max={500000}
            step={1000}
            valueLabelDisplay="auto"
            value={formik.values.biggestCampaign}
            onChange={formik.handleChange}
            valueLabelFormat={val =>
              new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
                val
              )
            }
            marks={[
              {
                value: 1000,
                label: '1000$',
              },
              {
                value: 500000,
                label: '500,000$',
              },
            ]}
          />
        </div>
        <div className="actions flex space-between">
          <Button className={isSubmitting ? 'disabled' : ''} type="submit" variant="contained" disableElevation>
            Submit
          </Button>
          <Link component="button" variant="body2">
            Reset Form
          </Link>
        </div>
      </form>
      {isSubmitting && <CircularProgress sx={{ m: '20px' }} />}
      {error && (
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </main>
  );
}
