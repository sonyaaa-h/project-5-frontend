import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./UserModal.module.css";

export const UserModal = ({ onClick }) => {
  const [avatar, setAvatar] = useState();
  //   const [avatarFile, setAvatarFile] = useState();

  const username = useSelector((state) => state.auth.user.name);
  const useremail = useSelector((state) => state.auth.user.email);

  const firstLetter = username.charAt(0);

  return (
    <div className={styles.Backdrop}>
      <div className={styles.modal}>
        <button onClick={onClick} type="button">
          Cancel
        </button>
        {avatar ? (
          <img src="#" alt={username} />
        ) : (
          <p className={styles.avatar}>{firstLetter}</p>
        )}
        <button>Add avatar</button>
        <input value={username} type="text" name="name" />
        <input value={useremail} type="text" name="email" />
        <button type="submit">Save</button>
      </div>
    </div>
  );
};
