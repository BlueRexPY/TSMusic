import React from "react";
import logoImg from "@/assets/img/bigLogo.svg";
import Image from "next/image";
const BigLogo = () => {
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
