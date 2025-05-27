const PlusIconModal = ({ className, ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="10"
    fill="none"
    {...props}
  >
    <path
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.5 2.083v5.834M2.583 5h5.833"
    />
  </svg>
);

export default PlusIconModal;
