import Image from "next/image";
import React from "react";
import styles from "./ProfileCard.module.scss";
import logoImg from "@/assets/img/userLogo.svg";
type Props = {
  count: number;
  name: string;
};
const ProfileCard = (props: Props) => {
  const { count, name } = props;
  return (
    <div className={styles.profileCard}>
      <Image
        id="authorLogo"
        src={logoImg}
        width={150}
        height={150}
        alt={name}
        draggable={false}
      />
      <div className={styles.profileCardInfo}>
        <h2>{name}</h2>
        <p>tracks: {count}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
