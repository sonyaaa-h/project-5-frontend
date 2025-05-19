import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

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
