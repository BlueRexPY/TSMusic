import React from "react";
import album from "@/assets/img/album.svg";
import albumLight from "@/assets/img/albumLight.svg";
import Image from "next/image";
import { useStores } from "@/hooks/useStore";

const AlbumIcon = () => {
  const { NavStore } = useStores();

  if(NavStore.navState.PATH === "PLAYLIST"){
    return (
      <div>
        <Image
          className="icon clickable"
          src={albumLight}
          width={50}
          height={50}
          alt="Album"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div>
      <Image
        className="icon clickable"
        src={album}
        width={50}
        height={50}
        alt="Album"
        draggable={false}
      />
    </div>
  );
};

export default AlbumIcon;
