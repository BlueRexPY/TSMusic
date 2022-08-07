import { useStores } from "@/hooks/useStore";
import React from "react";
import styles from "./ProfileMenu.module.scss";
import userLogo from "@/assets/img/userLogo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const ProfileMenu = () => {
  const { AuthStore } = useStores();
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    AuthStore.Logout();
  };

  if (AuthStore.AuthSettings.auth) {
    return (
      <div
        className={styles.container}
        onClick={() =>
          router.push(
            AuthStore.AuthSettings.auth
              ? "/profile/" + AuthStore.AuthSettings.name
              : "/login/"
          )
        }
      >
        <Image
          className={styles.logo}
          src={userLogo}
          width={40}
          height={40}
          alt="User"
          draggable={false}
        />
        <p className="fs_16 m10">
          {AuthStore.AuthSettings.auth ? AuthStore.AuthSettings.name : "Login"}
        </p>
        <p className="fs_16 m10">{AuthStore.AuthSettings.auth ? "|" : ""}</p>
        <p onClick={logout} className="fs_16 m10">
          {AuthStore.AuthSettings.auth ? "logout" : ""}
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={styles.container}
        onClick={() =>
          router.push(
            AuthStore.AuthSettings.auth
              ? "/profile/" + AuthStore.AuthSettings.name
              : "/login/"
          )
        }
      >
        <Image
          className={styles.logo}
          src={userLogo}
          width={40}
          height={40}
          alt="User"
          draggable={false}
        />
        <p className="fs_16 m10">
          {AuthStore.AuthSettings.auth ? AuthStore.AuthSettings.name : "Login"}
        </p>
      </div>
    );
  }
};

export default ProfileMenu;
