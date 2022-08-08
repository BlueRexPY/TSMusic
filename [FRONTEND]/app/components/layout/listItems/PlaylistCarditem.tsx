import React, { useState } from "react";
import styles from "./PlaylistItem.module.scss";
import { useStores } from "@/hooks/useStore";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { DEFUALT_API } from "@/utils//apiLinks";
import Image from "next/image";
import axios from "axios";


type Props = {
  name: string;
  id: string;
  picture: string;
  count: number;
};

const PlaylistCardItem = observer((props: Props) => {
  const router = useRouter();
  const { name, picture, count, id} = props;
  const myLoader = ({ src }: any) => {
    return picture;
  };

  const handleClick = ()=>{
    axios.post(DEFUALT_API + "albums/listen/" + id)
    router.push("/playlists/" + name)
  }


  return(
    <div className={styles.PlaylistCard} onClick={()=>handleClick()}>
        <Image
            id="playlistLogo"
            loader={myLoader}
            src={picture}
            width={250}
            height={250}
            alt={name}
            draggable={false}
        />
        <div className={styles.PlaylistCardInfo}>
            <h4>{name}</h4>
            <p>tracks: {count}</p>
        </div>
    </div>
  ) 
  
});

export default PlaylistCardItem;
