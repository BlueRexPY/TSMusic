import React, { memo } from "react";
import styles from "./TrackItem.module.scss";
import LikeIcon from "@/components/layout/icons/LikeIcon";
import { useStores } from '@/store/useStore'
type Props = {
  index?: number;
  name: string;
  artist: string;
  audio: string;
  id:string;
  picture:string;
};

const TrackItem = (props: Props) => {
  const { index, id, name, artist, picture, audio} = props;

  const { PlayerStore } = useStores();

  const handeleClick = ()=>{
    PlayerStore.setActive()
    PlayerStore.setPlay()
    PlayerStore.setTrack({_id:id,name:name,artist:artist,listens:0,picture:picture,audio:audio})
  }
  return (
    <div className={styles.tracksItem} onClick={()=>{handeleClick()}}>
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
