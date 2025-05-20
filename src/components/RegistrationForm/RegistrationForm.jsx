import { Field, Formik, Form, ErrorMessage, useFormik } from "formik";
import { useId, useState } from "react";
import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import logo from "../../assets/logo.svg";
import thumbupwallet from "../../assets/thumbupwallet.svg";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";
import PasswordStrengthBar from "react-password-strength-bar";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short!")
      .max(24, "Name is too long!")
      .required("Error: Name is required!"),
    email: Yup.string()
      .email("Error: Invalid email format!")
      .max(64, "Email must be 64 characters or less")
      .required("Email is required!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be 64 characters or less")
      .required("Error: Password is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const handleSubmit = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Successfully registered a user!");
        navigate("/");
      })
      .catch((error) => {
        if (error.includes("Email in use")) {
          toast.error("Email in use. Please try different email address.", {
            duration: 2000,
            style: {
              background: "rgb(206, 84, 84)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
            },
          });
        } else {
          toast.error("Bad request error", {
            duration: 2000,
            style: {
              background: "rgb(206, 84, 84)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
            },
            // options.resetForm();
          });
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: handleSubmit,
  });
  const passwordValue = formik.values.password;
  return (
    <div className={s.div}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={s.formWrapper}>
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
              <ErrorMessage className={s.error} name="name" component="span" />
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={s.input}
                  placeholder="Password"
                  autoComplete="password"
                  id={passwordFieldId}
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
              <div>
                <IoMdLock className={s.iconLock} />
                <Field
                  type="password"
                  name="confirm-password"
                  className={s.input}
                  placeholder="Confirm password"
                  style={{ color: "rgb(54, 32, 4)" }}
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
                name="confirm password"
                component="span"
              />
            </div>
            <PasswordStrengthBar
              className={s.passwordBar}
              password={passwordValue}
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
  );
};

export default RegistrationForm;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Link, useNavigate } from "react-router-dom";
// import css from "./RegistrationForm.module.css";
// import * as yup from "yup";
// import { nanoid } from "nanoid";
// import { useDispatch } from "react-redux";
// import { registerThunk } from "../../redux/auth/operations.js";
// import { showToastErrorMessage } from "../../utils/showToastErrorMessage.js";
// import PasswordStrengthBar from "react-password-strength-bar";

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .min(3, "Too short!")
//     .max(24, "Too long!")
//     .required("Name required!"),
//   email: yup
//     .string()
//     .email("Invalid email format!")
//     .required("Email required!"),
//   password: yup
//     .string()
//     .min(6, "Too short!")
//     .max(12, "Too long!")
//     .required("Password required!"),
// });

// const nameFormId = nanoid();
// const emailFormId = nanoid();
// const passwordFormId = nanoid();
// const passwordConfirmFormId = nanoid();

// export const RegistrationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm({ resolver: yupResolver(schema) });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = async (payload) => {
//     const data = {
//       name: payload.name,
//       email: payload.email,
//       password: payload.password,
//     };

//     if (payload.password !== payload["confirm-password"]) {
//       showToastErrorMessage("The passwords you entered do not match");
//       return;
//     }

//     dispatch(registerThunk(data))
//       .unwrap()
//       .then(() => navigate("/"));

//     reset();
//   };

//   const passwordValue = watch("password");

//   return (
//     <div className={css["register-form-container"]}>
//       <form
//         className={css.form}
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ paddingBottom: 20 }}
//       >
//         <div className={`${css.fields}`}>
//           <label htmlFor={nameFormId}>
//             <img
//               className={`${css.svg}`}
//               src="/user.svg"
//               width="24"
//               height="24"
//               alt="Letter picture"
//             />
//           </label>

//           <input
//             className={`${css.input} input`}
//             placeholder="Name"
//             id={nameFormId}
//             {...register("name", {
//               required: "Name required",
//             })}
//           />
//           {errors.name && <p className={css.errors}>{errors.name.message}</p>}
//         </div>

//         <div className={`${css.fields}`}>
//           <label htmlFor={emailFormId}>
//             <img
//               className={`${css.svg}`}
//               src="/letter.svg"
//               width="24"
//               height="24"
//               alt="Letter picture"
//             />
//           </label>

//           <input
//             className={`${css.input} input`}
//             // type="email"
//             placeholder="E-mail"
//             id={emailFormId}
//             {...register("email", {
//               required: "Email required",
//             })}
//           />

//           {errors.email && <p className={css.errors}>{errors.email.message}</p>}
//         </div>

//         <div className={`${css.fields}`}>
//           <label htmlFor={passwordFormId}>
//             <img
//               className={`${css.svg}`}
//               src="/lock.svg"
//               width="24"
//               height="24"
//               alt="Lock picture"
//             />
//           </label>

//           <input
//             className={`${css.input} input`}
//             type="password"
//             placeholder="Password"
//             id={passwordFormId}
//             {...register("password", {
//               required: "Password required",
//             })}
//           />

//           {errors.password && (
//             <p className={css.errors}>{errors.password.message}</p>
//           )}
//         </div>

//         <div className={`${css.fields}`}>
//           <label htmlFor={passwordConfirmFormId}>
//             <img
//               className={`${css.svg}`}
//               src="/lock.svg"
//               width="24"
//               height="24"
//               alt="Lock picture"
//             />
//           </label>

//           <input
//             className={`${css.input} input`}
//             type="password"
//             placeholder="Confirm password"
//             id={passwordConfirmFormId}
//             {...register("confirm-password", {
//               required: "Password required",
//             })}
//           />
//         </div>

//         <PasswordStrengthBar
//           className={css["password-bar"]}
//           password={passwordValue}
//           colors={["#ff4d4f", "#ff7a45", "#faad14", "#52c41a", "#367c4d"]}
//         />

//         <button
//           className="btn-gradient"
//           type="submit"
//           style={{ marginTop: 32 }}
//         >
//           register
//         </button>
//       </form>

//       <Link to="/login" className={`btn-classic`} style={{ display: "block" }}>
//         log in
//       </Link>
//     </div>
//   );
// };
