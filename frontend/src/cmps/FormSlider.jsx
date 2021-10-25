import { Slider } from '@mui/material';

export function FormSlider(props) {
  const { formik, name } = props;
  const valueLabelFormat = val =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const marks = [
    {
      value: 1000,
      label: '1000$',
    },
    {
      value: 500000,
      label: '500,000$',
    },
  ];

  return (
    <div className="slider-container flex column">
      <label htmlFor="">What was the biggest campaign budget you have managed in a single month?</label>
      <Slider
        className="slider"
        valueLabelDisplay="auto"
        value={formik.values[name]}
        onChange={formik.handleChange}
        valueLabelFormat={valueLabelFormat}
        marks={marks}
        {...props}
      />
    </div>
  );
}
