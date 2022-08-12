import { DEFUALT_API } from "@/utils//apiLinks";
import Image from "next/image";
import React from "react";
import styles from "./AuthorItem.module.scss";

type Props = {
  count: number;
  artist: string;
  picture: string;
};
const AuthorItem = (props: Props) => {
  const { count, artist, picture } = props;

  const myLoader = ({ src }: any) => {
    return picture;
  };
  return (
    <div className={styles.authorCard}>
      <Image
        id="authorLogo"
        loader={myLoader}
        src={picture}
        width={150}
        height={150}
        alt={artist}
        draggable={false}
      />

      <div className={styles.authorInfo}>
        <h2>{artist}</h2>
        <p>tracks: {count}</p>
      </div>
    </div>
  );
};

export default AuthorItem;
