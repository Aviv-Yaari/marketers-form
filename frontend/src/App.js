import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import './assets/styles/main.scss';

export function App() {
  return (
    <Router>
      <main className="app main-layout">
        <Switch>
          {routes.map(route => (
            <Route key={route.path} exact component={route.component} path={route.path} />
          ))}
        </Switch>
      </main>
    </Router>
  );
}
