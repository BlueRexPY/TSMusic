import styles from "./Navigation.module.scss";
import React from "react";
import LogoIcon from "../icons/LogoIcon";
import MusicIcon from "../icons/MusicIcon";
import AlbumIcon from "../icons/AlbumIcon";
import LikeIcon from "../icons/LikeIcon";
import { useRouter } from "next/router";
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react-lite';

const Navigation = observer(() => {
  const router = useRouter();
  const { AuthStore } = useStores();
  const { auth, name } = AuthStore.AuthSettings;
  return (
    <div className={styles.nav_bar}>
      <LogoIcon />
      <div onClick={() => router.push("/tracks")}>
        <MusicIcon />
      </div>
      <div onClick={() => router.push("/playlists")}>
        <AlbumIcon />
      </div>
      <div
        onClick={() =>
          auth ? router.push("/profile/" + name) : router.push("/login")
        }
      >
        <LikeIcon />
      </div>
    </div>
  );
})

export default Navigation;
