import React, { useState } from "react";
import styles from "./TrackItem.module.scss";
import LikeIcon from "@/components/layout/icons/LikeIcon";
import { useStores } from "@/hooks/useStore";
import { useListen } from "@/hooks/useListen";
import { useRouter } from "next/router";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { message } from "antd";
import PurpleLikeIcon from "../icons/PurpleLikeIcon";
type Props = {
  index?: number;
  listens: number;
  name: string;
  artist: string;
  audio: string;
  id: string;
  picture: string;
  hardLike?: boolean;
};

const TrackItem = observer((props: Props) => {
  const router = useRouter();
  const { index, id, name, artist, picture, audio, listens, hardLike } = props;
  const { PlayerStore } = useStores();
  const { AuthStore } = useStores();
  const { auth } = AuthStore.AuthSettings;
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(DEFUALT_API + "users/" + AuthStore.AuthSettings.name)
      .then((p) =>
        p.data.includes(id)
          ? setLiked(true)
          : hardLike
          ? setLiked(true)
          : setLiked(false)
      );
  }, []);

  const like = () => {
    if (auth) {
      axios.post(DEFUALT_API + "users/update/", {
        userName: AuthStore.AuthSettings.name,
        trackId: id,
      });
      setLiked(!liked);
      message.info(name + " updated!");
    } else {
      router.push("/login/");
    }
  };

  const handleClick = () => {
    PlayerStore.setActive();
    PlayerStore.setPlay();
    PlayerStore.setTrack({
      _id: id,
      name: name,
      artist: artist,
      listens: listens,
      picture: picture,
      audio: audio,
    });
    useListen(id);
  };

  if (liked) {
    return (
      <div
        className={styles.tracksItem}
        onClick={() => {
          handleClick();
        }}
      >
        <div className={styles.side}>
          <p>{index}</p>
          <h4>{name}</h4>
        </div>
        <div className={styles.sideLike} onClick={like}>
          <PurpleLikeIcon width={25} height={25} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.tracksItem}
        onClick={() => {
          handleClick();
        }}
      >
        <div className={styles.side}>
          <p>{index}</p>
          <h4>{name}</h4>
        </div>
        <div className={styles.sideLike} onClick={like}>
          <LikeIcon width={25} height={25} />
        </div>
      </div>
    );
  }
});

export default TrackItem;
