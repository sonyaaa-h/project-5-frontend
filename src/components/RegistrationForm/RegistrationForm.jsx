import { Field, Formik, Form, ErrorMessage } from "formik";
import { useId, useState } from "react";
import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations.js";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import logo from "../../assets/logo.svg";
import thumbupwallet from "../../assets/thumbupwallet.png";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";
import PasswordStrengthBar from "react-password-strength-bar";
import { motion } from "framer-motion";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short!")
      .max(24, "Name is too long!")
      .required("Error: Name is required!"),
    email: Yup.string()
      .email("Error: Invalid email format!")
      .max(64, "Email must be 64 characters or less")
      .required("Error: Email is required!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be 64 characters or less")
      .required("Error: Password is required!"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values) => {
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => {
        toast.success("Successfully registered a user!");
        navigate("/");
      })
      .catch((error) => {
        if (error && error.message && error.message.includes("Email in use")) {
          toast.error("Email in use. Please try different email address.", {
            duration: 2000,
            style: {
              background: "rgb(206, 84, 84)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
            },
          });
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className={s.div}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form className={s.formWrapper} noValidate>
              <img className={s.logo} src={logo} alt="logo" />
              <div>
                <div
                  className={`${s.nameContainer} 
                                              ${
                                                touched.name && errors.name
                                                  ? s.errorState
                                                  : ""
                                              }
                                              ${
                                                touched.name && !errors.name
                                                  ? s.successState
                                                  : ""
                                              }
                                          `}
                >
                  <FaUser className={s.iconUser} />
                  <Field
                    type="text"
                    name="name"
                    className={s.input}
                    placeholder="Name"
                    style={{ color: "rgb(54, 32, 4)" }}
                  />
                </div>
                <h6 className={s.error}>
                  {touched.name && errors.name ? errors.name : '\u00A0'}
                </h6>
                <div
                  className={`${s.emailContainer} 
                                              ${
                                                touched.email && errors.email
                                                  ? s.errorState
                                                  : ""
                                              }
                                              ${
                                                touched.email && !errors.email
                                                  ? s.successState
                                                  : ""
                                              }
                                          `}
                >
                  <MdEmail className={s.iconEmail} />
                  <Field
                    id={emailFieldId}
                    type="email"
                    name="email"
                    className={s.input}
                    placeholder="E-mail"
                    autoComplete="email"
                  />
                </div>
                <h6 className={s.error}>
                  {touched.email && errors.email ? errors.email : '\u00A0'}
                </h6>
                <div
                  className={`${s.pwdContainer} 
                                          ${
                                            touched.password && errors.password
                                              ? s.errorState
                                              : ""
                                          }
                                          ${
                                            touched.password && !errors.password
                                              ? s.successState
                                              : ""
                                          }
                                      `}
                >
                  <IoMdLock className={s.iconLock} />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={s.input}
                    placeholder="Password"
                    autoComplete="password"
                    id={passwordFieldId}
                  />
                  <button
                    className={s.toggleBtn}
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <RiEye2Line className={s.icon} />
                    ) : (
                      <RiEyeCloseFill className={s.icon} />
                    )}
                  </button>
                </div>
                <h6 className={s.error}>
                  {touched.password && errors.password ? errors.password : '\u00A0'}
                </h6>
                <div
                  className={`${s.pwdConfContainer} 
                                          ${
                                            touched.password && errors.password
                                              ? s.errorState
                                              : ""
                                          }
                                          ${
                                            touched.password && !errors.password
                                              ? s.successState
                                              : ""
                                          }
                                      `}
                >
                  <IoMdLock className={s.iconLock} />
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={s.input}
                    placeholder="Confirm password"
                    style={{ color: "rgb(54, 32, 4)" }}
                  />
                  <button
                    className={s.toggleBtn}
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <RiEye2Line className={s.icon} />
                    ) : (
                      <RiEyeCloseFill className={s.icon} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={s.error}
                  name="confirm password"
                  component="h6"
                />
              </div>
              <PasswordStrengthBar
                className={s.passwordBar}
                password={values.password}
                barColors={[
                  "#508f8c",
                  "#ef4836",
                  "#f6b44d",
                  "#25c281",
                  "#0b6016",
                ]}
                scoreWords={["Weak", "Okay", "Good", "Strong", "Excellent"]}
                minLength={8}
                shortScoreWord="Weak"
              />
              <button type="submit" className={s.button}>
                Register
              </button>
              <p className={s.text}>
                <NavLink className={s.link} to="/login">
                  Login
                </NavLink>
              </p>
            </Form>
          )}
        </Formik>
        <img className={s.wallet} src={thumbupwallet} alt="wallet" />
      </div>
    </motion.div>
  );
};

export default RegistrationForm;
