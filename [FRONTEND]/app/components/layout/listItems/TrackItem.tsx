import React from "react";
import styles from "./TrackItem.module.scss";
import LikeIcon from "@/components/layout/icons/LikeIcon";
import { useStores } from '@/store/useStore'
type Props = {
  index?: number;
  name: string;
  artist: string;
  duration: number;
  audio: string;
  id:string;
  picture:string;
};

const TrackItem = (props: Props) => {
  const { index = 0, id="0", name = "Name",artist="artist", picture="https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png", duration = 233, audio="https://mp3uk.net/mp3/files/gone-fludd-traxxxmania-mp3.mp3" } = props;


  const { PlayerStore } = useStores();

  const handeleClick = ()=>{
    PlayerStore.setActive(duration)
    PlayerStore.setPlay()
    PlayerStore.setTrack({_id:id,name:name,artist:artist,listens:0,picture:picture,audio:audio})
  }
  return (
    <div className={styles.tracksItem} onClick={()=>{handeleClick()}}>
      <div className={styles.side}>
        <p>{index}</p>
        <h4>{name}</h4>
      </div>
      <div className={styles.side}>
        <p>{Math.floor(duration / 60)}:{(Math.floor(duration - ( Math.floor(duration / 60) * 60)) < 10 ? "0" : "")}{Math.floor(duration - ( Math.floor(duration / 60) * 60))}</p>
        <LikeIcon width={25} height={25} />
      </div>
    </div>
  );
};

export default TrackItem;
