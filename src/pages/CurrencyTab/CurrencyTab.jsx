import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency.jsx";

const CurrencyTab = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return <div>{isMobile && <Currency />}</div>;
};

export default CurrencyTab;
