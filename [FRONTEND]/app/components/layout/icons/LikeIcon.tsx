import React from "react";
import Like from "@/assets/img/like.svg";
import LikeLight from "@/assets/img/likeLight.svg";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStore";
type Props = {
  width?: number;
  height?: number;
};

const LikeIcon = observer(({ width = 50, height = 50 } : Props) => {
  const { NavStore } = useStores();

  if(NavStore.navState.PATH === "FAV"){
    return (
      <>
        <Image
          className="icon clickable"
          src={LikeLight}
          width={width}
          height={height}
          alt="Like"
          draggable={false}
        />
      </>
    );
  }
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
