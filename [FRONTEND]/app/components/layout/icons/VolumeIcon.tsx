import React from "react";
import volumeFull from "@/assets/img/volumeFull.svg";
import volumeLow from "@/assets/img/volumeLow.svg";
import volumeMed from "@/assets/img/volumeMed.svg";
import Image from "next/image";

type Props = {
  volume?: number;
};

const VolumeIcon = ({volume = 100}:Props) => {
  if(volume >= 50){
    return (
      <div>
        <Image
        className="clickable"
          src={volumeFull}
          width={50}
          height={50}
          alt="Volume"
          draggable={false}
        />
      </div>
    );
  }
  if(volume < 50 && volume > 1){
    return (
      <div>
        <Image
        className="clickable"
          src={volumeMed}
          width={50}
          height={50}
          alt="Volume"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div>
      <Image
      className="clickable"
        src={volumeLow}
        width={50}
        height={50}
        alt="Volume"
        draggable={false}
      />
    </div>
  );
};

export default VolumeIcon;
