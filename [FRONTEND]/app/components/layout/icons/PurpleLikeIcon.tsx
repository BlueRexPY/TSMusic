import React from "react";
import LikePurple from "@/assets/img/likePurple.svg";
import Image from "next/image";
import { observer } from "mobx-react-lite";
type Props = {
  width?: number;
  height?: number;
};

const PurpleLikeIcon = observer(({ width = 50, height = 50 }: Props) => {
  return (
    <>
      <Image
        className="icon"
        src={LikePurple}
        width={width}
        height={height}
        alt="Like"
        draggable={false}
      />
    </>
  );
});

export default PurpleLikeIcon;
