import React from "react";
import logoImg from "@/assets/img/back.svg";
import Image from "next/image";

const BackIcon = () => {
  return (
    <div>
      <Image
        src={logoImg}
        width={50}
        height={50}
        className="noboard clickable"
        alt="Back"
        draggable={false}
      />
    </div>
  );
};

export default BackIcon;
