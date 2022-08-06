import React from "react";
import logoImg from "@/assets/img/album.svg";
import Image from "next/image";

const AlbumIcon = () => {
  return (
    <div>
      <Image
        className="icon"
        src={logoImg}
        width={50}
        height={50}
        alt="Album"
        draggable={false}
      />
    </div>
  );
};

export default AlbumIcon;
