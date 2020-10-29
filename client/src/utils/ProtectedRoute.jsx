import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserProvider from '../contexts/UserProvider';

export default function ProtectedRoute({ children, ...rest }) {
  const user = React.useContext(UserProvider.context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isLoading ? (
          <div />
        ) : user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
