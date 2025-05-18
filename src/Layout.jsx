import { Outlet } from "react-router-dom";
import ButtonAddTransaction from "./components/ButtonAddTransaction/ButtonAddTransaction";

const Layout = () => {
  const handleClick = () => {
    console.log("Клік по кнопці!");
  };

  return (
    <div>
      <Outlet />
      <ButtonAddTransaction onClick={handleClick} />
    </div>
  );
};

export default Layout;
