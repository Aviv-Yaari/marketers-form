import { HomePage } from './pages/HomePage';
import { ThankYou } from './pages/ThankYou';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: HomePage,
    label: 'Home',
  },
  {
    path: '/thankyou',
    component: ThankYou,
    label: 'Thank You',
  },
];

export default routes;
