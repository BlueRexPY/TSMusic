import React from "react";
import logoImg from "@/assets/img/volume.svg";
import Image from "next/image";

const VolumeIcon = () => {
  return (
    <div>
      <Image
      className="clickable"
        src={logoImg}
        width={50}
        height={50}
        alt="Volume"
        draggable={false}
      />
    </div>
  );
};

export default VolumeIcon;
