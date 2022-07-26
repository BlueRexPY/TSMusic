import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/likePurple.svg";
import Image from "next/image";
type Props = {
  width?: number;
  height?: number;
};

const LikeIcon = (props: Props) => {
  const { width = 50, height = 50 } = props;
  return (
    <>
      <Image
        className="icon"
        src={logoImg}
        width={width}
        height={height}
        alt="Like"
        draggable={false}
      />
    </>
  );
};

export default LikeIcon;
