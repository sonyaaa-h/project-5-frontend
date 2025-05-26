import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
// import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing, selectToken } from "./redux/auth/selectors.js";
import { selectIsLoading } from "./redux/global/selectors";
import { lazy, Suspense } from 'react';
import MasterLoader from "./components/MasterLoader/MasterLoader";
import { setAuthHeader } from "./redux/auth/api.js";
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const Layout = lazy(() => import('./Layout/Layout'))
const HomeTab = lazy(() => import('./pages/HomeTab/HomeTab'))
const StatisticsTab = lazy(() => import('./pages/StatisticsTab/StatisticsTab'))
const CurrencyTab = lazy(() => import('./pages/CurrencyTab/CurrencyTab'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))


function App() {
  const token = useSelector(selectToken)
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  if (isRefreshing) {
    return <h1>Loading application...</h1>;
  }

  return (
    <>
      <Suspense fallback={<MasterLoader open={isLoading} />}>
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
          element={<PrivateRoute component={Layout} redirectTo="/login" />}
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route path="currency" element={<CurrencyTab />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      
    </>
  );
}

export default App;
