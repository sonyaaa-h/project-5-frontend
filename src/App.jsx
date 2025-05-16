import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
// import PrivateRoute from "./PrivateRoute";
// import RestrictedRoute from "./RestrictedRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomeTab from "./pages/HomeTab/HomeTab";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";

function App() {
  return (
    <Routes>
      <Route path="register" element={<RegistrationPage />} />

      <Route path="login" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<HomeTab />} />
        <Route path="statistics" element={<StatisticsTab />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
