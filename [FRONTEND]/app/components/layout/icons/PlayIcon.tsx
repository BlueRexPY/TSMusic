import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/play.svg";
import Image from "next/image";
type Props = {};

const PlayIcon = (props: Props) => {
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
