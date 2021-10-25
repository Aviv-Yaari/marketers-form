import { Alert, CircularProgress, MenuItem, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { FormActions } from '../cmps/FormActions';
import { FormField } from '../cmps/FormField';
import { FormSlider } from '../cmps/FormSlider';
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

export function HomePage(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [marketersCount, setMarketersCount] = useState(0);

  useEffect(() => {
    httpService.get('marketer').then(marketers => setMarketersCount(marketers.length));
  }, []);

  const onSubmit = async values => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await httpService.post('marketer', values);
      props.history.push('/thankyou?data=' + JSON.stringify(values));
    } catch (err) {
      setIsSubmitting(false);
      setError(err.response?.data?.err || 'An error occured while submitting the form');
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
      {marketersCount ? <p>{marketersCount} marketers have joined so far!</p> : <></>}
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
        <FormSlider formik={formik} name="biggestCampaign" min={1000} max={500000} step={1000} />
        <FormActions isSubmitting={isSubmitting} />
      </form>
      {isSubmitting && <CircularProgress sx={{ m: '20px' }} />}
      {error && (
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </main>
  );
}
