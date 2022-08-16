import React from "react";
import logoImg from "@/assets/img/bigLogo.svg";
import Image from "next/image";
const BigLogo = () => {
  return (
    <div id="bigLogo">
      <div className="backgroundCircle"></div>
      <Image
        src={logoImg}
        width={350}
        height={150}
        className="noboard"
        alt="bigLogo"
        draggable={false}
      />
    </div>
  );
};

export default BigLogo;
