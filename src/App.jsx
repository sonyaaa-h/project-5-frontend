import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomeTab from "./pages/HomeTab/HomeTab";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";
import CurrencyTab from "./pages/CurrencyTab/CurrencyTab";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefreshing) {
    return <h1>Loading application...</h1>;
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
        element={<PrivateRoute component={Layout} redirectTo="/login" />}
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
