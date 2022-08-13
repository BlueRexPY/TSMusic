import Image from "next/image";
import React from "react";
import styles from "./PlaylistCard.module.scss";
import logoImg from "@/assets/img/playlistLogo.svg";
import { useRouter } from "next/router";
import { DEFAULT_API } from "@/utils//apiLinks";
type Props = {
  count: number;
  name: string;
  listens: number;
  author: string;
  image: string;
};
const PlaylistCard = ({ count, name, listens, author, image }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.playlistCard}>
      <Image
        id="authorLogo"
        loader={() => image}
        src={image}
        width={150}
        height={150}
        alt={name}
        draggable={false}
      />
      <div className={styles.playlistInfo}>
        <h2>{name}</h2>
        <p>tracks: {count}</p>
        <p
          className="clickable"
          onClick={() => router.push("/profile/" + author)}
        >
          author: {author}
        </p>
        <p>listens: {listens}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
