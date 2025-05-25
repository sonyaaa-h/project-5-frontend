import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserModal.module.css";
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { updateUserThunk } from "../../redux/auth/operations";

export const UserModal = ({ onClick }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(null);

  const username = useSelector((state) => state.auth.user.name);
  const useremail = useSelector((state) => state.auth.user.email);

  const firstLetter = username ? username.charAt(0) : "?";

  const updateValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short!")
      .max(24, "Name is too long!")
      .required("Error: Name is required!"),
    email: Yup.string()
      .email("Error: Invalid email format!")
      .max(64, "Email must be 64 characters or less")
      .required("Email is required!"),
  });

  const initialValues = {
    name: username,
    email: useremail,
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    if (photo) {
      formData.append("photo", photo);
    }

    dispatch(updateUserThunk(formData))
      .unwrap()
      .then(() => {
        toast.success("Successfully updated a user!");
        onClick();
      })
      .catch((error) => {
        toast.error("Something went wrong. Try again!", {
          duration: 2000,
          style: {
            background: "rgb(206, 84, 84)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClick]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={styles.Backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <Formik
          initialValues={initialValues}
          validationSchema={updateValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form encType="multipart/form-data">
            <button onClick={onClick} type="button">
              Cancel
            </button>

            {photo ? (
              <img src={preview} alt={name} className={styles.avatarImage} />
            ) : (
              <p className={styles.avatar}>{firstLetter}</p>
            )}

            <div className={styles.formGroup}>
              <Field name="photo" type="file" onChange={handleFileChange} />
              <ErrorMessage
                name="photo"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <Field name="name" type="text" />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit">Save</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
