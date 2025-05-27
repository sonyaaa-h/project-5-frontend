import { Rings } from "react-loader-spinner";
import css from "./MasterLoader.module.css";
import ReactModal from "react-modal";

export default function MasterLoader({ open }) {
  return (
    <ReactModal
      appElement={document.getElementById("root") || undefined}
      isOpen={open}
      preventScroll={true}
      overlayClassName={css.loaderOverlay}
      className={css.loaderContent}
    >
      <Rings
        visible={true}
        height="150"
        width="150"
        color="#508f8c"
        ariaLabel="rings-loading"
      />
    </ReactModal>
  );
}
