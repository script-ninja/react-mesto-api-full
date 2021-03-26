import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
  return (
    <Route>
      { props.condition ? props.children : <Redirect to={props.redirectPath} /> }
    </Route>
  );
}
