import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/bigLogo.svg";
import Image from "next/image";
type Props = {};

const BigLogo = (props: Props) => {
  return (
    <Image
      src={logoImg}
      width={350}
      height={150}
      className="noboard bigLogo"
      alt="Back"
      draggable={false}
    />
  );
};

export default BigLogo;
