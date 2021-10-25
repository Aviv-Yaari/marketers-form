import { Button, Link } from '@mui/material';

export function FormActions({ isSubmitting }) {
  return (
    <div className="actions flex space-between">
      <Button className={isSubmitting ? 'disabled' : ''} type="submit" variant="contained" disableElevation>
        Submit
      </Button>
      <Link component="button" variant="body2">
        Reset Form
      </Link>
    </div>
  );
}
