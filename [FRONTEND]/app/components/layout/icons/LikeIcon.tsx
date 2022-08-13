import React from "react";
import Like from "@/assets/img/like.svg";
import Image from "next/image";
import { observer } from "mobx-react-lite";
type Props = {
  width?: number;
  height?: number;
};

const LikeIcon = observer(({ width = 50, height = 50 } : Props) => {
  return (
    <>
      <Image
        className="icon clickable"
        src={Like}
        width={width}
        height={height}
        alt="Like"
        draggable={false}
      />
    </>
  );
});

export default LikeIcon;
