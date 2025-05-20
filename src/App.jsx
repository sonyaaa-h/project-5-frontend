
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomeTab from './pages/HomeTab/HomeTab';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import StatisticsTab from './pages/StatisticsTab/StatisticsTab';
import CurrencyTab from './pages/CurrencyTab/CurrencyTab';
import { refreshUser } from './redux/auth/operations';
import { selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="register"
        element={
          <RestrictedRoute component={RegistrationPage} redirectTo="/" />
        }
      />
      <Route
        path="login"
        element={<RestrictedRoute component={LoginPage} redirectTo="/" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<HomeTab />} />
        <Route path="statistics" element={<StatisticsTab />} />
        <Route path="currency" element={<CurrencyTab />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
