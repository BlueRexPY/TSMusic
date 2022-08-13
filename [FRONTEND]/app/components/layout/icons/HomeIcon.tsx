import React from "react";
import logoImg from "@/assets/img/home.svg";
import Image from "next/image";

const HomeIcon = () => {
  return (
    <div>
      <Image
        className="icon clickable"
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
