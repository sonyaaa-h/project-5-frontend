import { Bars } from "react-loader-spinner";
import css from "./MasterLoader.module.css";
import ReactModal from "react-modal";

export default function MasterLoader({open}) {
  return (
    <ReactModal
      isOpen={open}
      preventScroll={true}
      className={css.modal}
      style={{
        overlay: { zIndex: 9 },
      }}
    >
      <Bars
        visible={true}
        height="80"
        width="80"
        color="#223438"
        ariaLabel="rings-loading"
        wrapperClass={css.wrapper}
      />
    </ReactModal>
  );
}
