import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/back.svg";
import Image from "next/image";
type Props = {};

const BackIcon = (props: Props) => {
  return (
    <div>
      <Image
        src={logoImg}
        width={50}
        height={50}
        className="noboard"
        alt="Back"
        draggable={false}
      />
    </div>
  );
};

export default BackIcon;
