import { DEFAULT_API } from "@/utils//apiLinks";
import axios from "axios";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import styles from "./TopTrack.module.scss";
import { ITrack } from "@/store/types";
import StopIcon from "../icons/StopIcon";
import { useStores } from "@/hooks/useStore";
import { useListen } from "@/hooks/useListen";
import { Spin } from "antd";

const TopTrack = () => {
  const { TracksStore } = useStores();
  const [track, setTrack] = useState<ITrack[]>([TracksStore.tracksList[0]]);
  const { PlayerStore } = useStores();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    axios
      .get(DEFAULT_API + "tracks/gettop/1")
      .then((resp) => setTrack(resp.data))
      .then(() => setLoading(false));
  }, []);

  const { _id, name, artist, picture, audio, listens }: ITrack = track[0];

  const handleClick = () => {
    TracksStore.fetchTracks()
    PlayerStore.setActive();
    PlayerStore.setPlay();
    PlayerStore.setTrack({
      _id: _id,
      name: name,
      artist: artist,
      listens: listens,
      picture: picture,
      audio: audio,
    });
    useListen(_id);
  };

  if (loading) {
    return <Spin />;
  } 
  return (
    <div id="topTrackCard" className={styles.topTrackCard}>
      <Image
        src={picture}
        loader={() => picture}
        width={150}
        height={150}
        alt={name}
        draggable={false}
      />

      <div className={styles.topTrackInfo}>
        <h2>{name}</h2>
        <h3>{artist}</h3>
        <p>listens: {listens}</p>
      </div>

      <div
        className={styles.topTrackButton}
        onClick={() => {
          handleClick();
        }}
      >
        <StopIcon />
      </div>
    </div>
  );
  
};

export default TopTrack;
