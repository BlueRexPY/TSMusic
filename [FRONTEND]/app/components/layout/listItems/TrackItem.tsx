import React from "react";
import styles from "./TrackItem.module.scss";
import LikeIcon from "@/components/layout/icons/LikeIcon";
import { useStores } from "@/hooks/useStore";
import { useListen } from "@/hooks/useListen";
type Props = {
  index?: number;
  listens: number;
  name: string;
  artist: string;
  audio: string;
  id: string;
  picture: string;
};

const TrackItem = (props: Props) => {
  const { index, id, name, artist, picture, audio, listens } = props;

  const { PlayerStore } = useStores();

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
      <div className={styles.sideLike}>
        <LikeIcon width={25} height={25} />
      </div>
    </div>
  );
};

export default TrackItem;
