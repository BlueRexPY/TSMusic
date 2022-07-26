import React, {useState} from "react";
import styles from "./TrackItem.module.scss";
import LikeIcon from "@/components/layout/icons/LikeIcon";
import LikeIconPurple from "@/components/layout/icons/LikeIconPurple";
import { useStores } from "@/hooks/useStore";
import { useListen } from "@/hooks/useListen";
import { useRouter } from "next/router";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { message } from "antd";
type Props = {
  index?: number;
  listens: number;
  name: string;
  artist: string;
  audio: string;
  id: string;
  picture: string;
  hardLiked?:boolean;
};

 
const TrackItem = observer((props: Props) => {
  const router = useRouter();
  const { index, id, name, artist, picture, audio, listens, hardLiked} = props;
  const { PlayerStore } = useStores();
  const { AuthStore } = useStores();
  const {auth} = AuthStore.AuthSettings
  const [favTracks, setFavTracks] = useState<string[]>([])
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
     const feach= async ()=> {
      
       axios.get(DEFUALT_API+"users/"+AuthStore.AuthSettings.name).then(p=>setFavTracks(p.data))
      if(favTracks.includes(id)){
        await setLiked(true) 
      }
      feach()
    }
  }, [])
  
  const like = ()=>{
    if(auth){
      axios.post(DEFUALT_API+'users/update/', { userName: AuthStore.AuthSettings.name, trackId: id})
      setLiked(!liked) 
      message.success(name)
    }else{
      router.push("/login/")
    }
  }
  const likeIcon =()=>{
    if(liked){
      return <LikeIconPurple width={25} height={25} />
    }else{
      return <LikeIcon width={25} height={25} />
    }
  }

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
      <div className={styles.sideLike} onClick={like}>
        {likeIcon()}
      </div>
    </div>
  );
});

export default TrackItem;
