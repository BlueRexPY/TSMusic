import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/home.svg";
import Image from "next/image";
type Props = {};

const HomeIcon = (props: Props) => {
  return (
    <div>
      <Image
        className="icon"
        src={logoImg}
        width={50}
        height={50}
        alt="Like"
        draggable={false}
      />
    </div>
  );
};

export default HomeIcon;
