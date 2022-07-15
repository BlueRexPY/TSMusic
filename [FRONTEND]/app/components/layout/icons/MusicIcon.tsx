import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/music.svg";
import Image from "next/image";
type Props = {};

const MusicIcon = (props: Props) => {
  return (
    <div>
      <Image
        className="icon"
        src={logoImg}
        width={50}
        height={50}
        alt="Music"
        draggable={false}
      />
    </div>
  );
};

export default MusicIcon;
