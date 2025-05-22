import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./redux/auth/selectors.js";
import { selectTransactions } from "./redux/transactions/selectors.js";

const PrivateRoute = ({ component: Component, redirectTo = "/login" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const transactions = useSelector(selectTransactions);

  const shouldRedirect = !isLoggedIn && !isRefreshing && !transactions;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;
