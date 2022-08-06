import React from "react";
import logoImg from "@/assets/img/play.svg";
import Image from "next/image";

const PlayIcon = () => {
  return (
    <>
      <Image
        src={logoImg}
        width={50}
        height={50}
        alt="play"
        draggable={false}
      />
    </>
  );
};

export default PlayIcon;
