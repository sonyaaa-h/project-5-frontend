import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserModal.module.css";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { updateUserThunk } from "../../redux/auth/operations";
import CloseIconModal from "../tempIcons/CloseIcon";
import PlusIconModal from "../tempIcons/PlusIcon";

export const UserModal = ({ onClick }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(null);

  const username = useSelector((state) => state.auth.user.name);
  const useremail = useSelector((state) => state.auth.user.email);
  const userphoto = useSelector((state) => state.auth.user.photo);

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
      .catch(() => {
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
    <div>
      <div className={styles.Backdrop} onClick={handleBackdropClick}>
        <div className={styles.modal}>
          <button onClick={onClick} type="button" className={styles.closeBtn}>
            <CloseIconModal className={styles.closeIcon} />
          </button>
          {preview ? (
            <img src={preview} alt="Preview" className={styles.avatarImage} />
          ) : userphoto ? (
            <img
              src={userphoto}
              alt={username}
              className={styles.avatarImage}
            />
          ) : (
            <p className={styles.avatar}>{firstLetter}</p>
          )}
          <div className={styles.photoBox}>
            <label htmlFor="avatar-upload" className={styles.uploadButton}>
              <PlusIconModal className={styles.plusIcon} />
              <input
                id="avatar-upload"
                name="photo"
                type="file"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </label>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={updateValidationSchema}
            onSubmit={handleSubmit}
            className={styles.formik}
          >
            <Form encType="multipart/form-data" className={styles.form}>
              <div className={styles.inputBox}>
                <Field name="name">
                  {({ field, meta }) => {
                    const inputClass =
                      meta.touched && meta.error
                        ? `${styles.input} ${styles.invalid}`
                        : meta.touched && !meta.error
                        ? `${styles.input} ${styles.valid}`
                        : styles.input;
                    return (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Name"
                          className={inputClass}
                        />
                        {meta.touched && meta.error && (
                          <div className={styles.error}>{meta.error}</div>
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
              <div className={styles.inputBox}>
                <Field name="email">
                  {({ field, meta }) => {
                    const inputClass =
                      meta.touched && meta.error
                        ? `${styles.input} ${styles.invalid}`
                        : meta.touched && !meta.error
                        ? `${styles.input} ${styles.valid}`
                        : styles.input;
                    return (
                      <>
                        <input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className={inputClass}
                        />
                        {meta.touched && meta.error && (
                          <div className={styles.error}>{meta.error}</div>
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
