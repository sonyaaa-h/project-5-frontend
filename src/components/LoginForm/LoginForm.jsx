import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import s from "./LoginForm.module.css";
import { loginThunk } from "../../redux/auth/operations.js";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/logo.svg";
import wallet from "../../assets/wallet.svg";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch((errorMessage) => {
        if (errorMessage.includes("User not found")) {
          toast.error("User not found. Please register.", {
            duration: 4000,
            style: {
              background: "rgb(206, 84, 84)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
            },
          });
        } else {
          toast.error("Login o password error.", {
            duration: 4000,
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

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Error: Invalid email format")
      .max(64, "Email must be 64 characters or less")
      .required("Error: Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be 64 characters or less")
      .required("Error: Password is required"),
  });

  return (
    <div className={s.loginForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={LogInSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <img className={s.logo} src={logo} alt="logo" />
            <div>
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
                  className={s.input}
                  name="email"
                  type="email"
                  id={emailFieldId}
                  placeholder="E-mail"
                  autoComplete="email"
                  required
                />
              </div>
              <ErrorMessage className={s.error} name="email" component="span" />

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
                  className={s.input}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id={passwordFieldId}
                  placeholder="Password"
                  autoComplete="password"
                  required
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
              <ErrorMessage
                className={s.error}
                name="password"
                component="span"
              />
            </div>

            <button className={s.btnLogIn} type="submit">
              Log in
            </button>
            <p className={s.link}>
              <NavLink className={s.linkReg} to="/register">
                Register
              </NavLink>
            </p>
          </Form>
        )}
      </Formik>
      <img className={s.wallet} src={wallet} alt="wallet" />
    </div>
  );
};
