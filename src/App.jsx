import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import { selectToken } from "./redux/auth/selectors.js";
import { lazy, Suspense } from "react";
import MasterLoader from "./components/MasterLoader/MasterLoader";
import { setAuthHeader } from "./redux/auth/api.js";
import { AnimatePresence } from "framer-motion";
import { selectIsLoading } from "./redux/global/selectors.js";
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Layout = lazy(() => import("./Layout/Layout"));
const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab/StatisticsTab"));
const CurrencyTab = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const token = useSelector(selectToken);
  const location = useLocation();
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  return (
    <>
      {isLoading && <MasterLoader open={true} />} 
      <Suspense fallback={<MasterLoader open={true}/>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
          </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
