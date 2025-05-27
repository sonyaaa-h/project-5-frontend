const PlusIconModal = ({ className, ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    {...props}
  >
    <path
      d="M13 0.272705V25.7273"
      stroke="currentColor"
      strokeWidth="2.54545"
    />
    <path
      d="M0.272949 13L25.7275 13"
      stroke="currentColor"
      strokeWidth="2.54545"
    />
  </svg>
);

export default PlusIconModal;
