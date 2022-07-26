import { DEFUALT_API } from "@/utils//apiLinks";
import Image from "next/image";
import React from "react";
import styles from "./ProfileCard.module.scss";
import userLogo from "@/assets/img/userLogo.svg";
import { Button } from "antd";
import { useStores } from "@/hooks/useStore";

type Props = {
  count: number;
  name: string;
};
const ProfileCard = (props: Props) => {
  const { count, name} = props;
  const { AuthStore } = useStores();

  return (
    <div className={styles.profileCard}>
        
        <Image
            id="authorLogo"
            src={userLogo}
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
