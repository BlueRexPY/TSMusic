import styles from "./Navigation.module.scss";
import React, { memo } from "react";
import LogoIcon from "../icons/LogoIcon";
import HomeIcon from "../icons/HomeIcon";
import MusicIcon from "../icons/MusicIcon";
import AlbumIcon from "../icons/AlbumIcon";
import LikeIcon from "../icons/LikeIcon";
import { useRouter } from "next/router";
import AuthStore from "@/store/AuthStore";

const Navigation = () => {
  const router = useRouter();
  const {auth,name} = AuthStore.AuthSettings
  return (
    <div className={styles.nav_bar}>
      <LogoIcon />
      <div onClick={() => router.push("/")}>
        <HomeIcon />
      </div>
      <div onClick={() => router.push("/tracks")}>
        <MusicIcon />
      </div>
      <div onClick={() => router.push("/playlists")}>
        <AlbumIcon />
      </div>
      <div onClick={() => auth?router.push("/profile/"+name):router.push("/login")}>
        <LikeIcon />
      </div>
    </div>
  );
};

export default memo(Navigation);
