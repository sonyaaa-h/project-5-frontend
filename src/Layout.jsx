import { Outlet } from "react-router-dom";
import ButtonAddTransaction from "./components/ButtonAddTransaction/ButtonAddTransaction";
import AppBar from "./components/AppBar/AppBar";

const Layout = () => {
  const handleClick = () => {
    console.log("Клік по кнопці!");
  };

  return (
    <div>
      <AppBar />
      <Outlet />
      <ButtonAddTransaction onClick={handleClick} />
    </div>
  );
};

export default Layout;
