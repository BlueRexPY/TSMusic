import Link from "next/link";
import React from "react";
import logoImg from "@/assets/img/next.svg";
import Image from "next/image";
type Props = {};

const NextIcon = (props: Props) => {
  return (
    <div>
      <Image
        src={logoImg}
        width={50}
        height={50}
        className="noboard"
        alt="Next"
        draggable={false}
      />
    </div>
  );
};

export default NextIcon;
