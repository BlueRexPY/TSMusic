import React from "react";
import music from "@/assets/img/music.svg";
import musicLight from "@/assets/img/musicLight.svg";
import Image from "next/image";
import { useStores } from "@/hooks/useStore";

const MusicIcon = () => {
  const { NavStore } = useStores();

  if(NavStore.navState.PATH === "TRACKS"){
    return (
      <>
        <Image
          className="icon clickable"
          src={musicLight}
          width={50}
          height={50}
          alt="Music"
          draggable={false}
        />
      </>
    );
  }
  return (
    <>
      <Image
        className="icon clickable"
        src={music}
        width={50}
        height={50}
        alt="Music"
        draggable={false}
      />
    </>
  );
 
};

export default MusicIcon;
