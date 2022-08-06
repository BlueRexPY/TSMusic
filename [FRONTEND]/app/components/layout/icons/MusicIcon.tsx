import React from "react";
import logoImg from "@/assets/img/music.svg";
import Image from "next/image";


const MusicIcon = () => {
  return (
    <>
      <Image
        className="icon"
        src={logoImg}
        width={50}
        height={50}
        alt="Music"
        draggable={false}
      />
    </>
  );
};

export default MusicIcon;
