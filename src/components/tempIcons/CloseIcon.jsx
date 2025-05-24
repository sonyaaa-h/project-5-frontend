const CloseIconModal = ({ className, ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    {...props}
  >
    <path stroke="#081222" d="m1 1 16 16M1 17 17 1" />
  </svg>
);

export default CloseIconModal;
