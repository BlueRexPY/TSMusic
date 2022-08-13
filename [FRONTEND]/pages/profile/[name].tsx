import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { DEFAULT_API } from "@/utils//apiLinks";
import { observer } from "mobx-react-lite";
import TrackItem from "@/components/layout/listItems/TrackItem";
import ProfileCard from "@/components/layout/profile/ProfileCard";
import { useStores } from "@/hooks/useStore";
import { Spin } from "antd";
import { ITrack } from "@/store/types";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params?.name;
  return {
    props: {
      name: name,
    },
  };
};

type user = {
  name: string;
};

const Profile = observer((user: user) => {
  const { NavStore } = useStores();
  
  const [tracksList, setTracksList] = useState<ITrack[]>([]);
  const { AuthStore } = useStores();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(AuthStore.AuthSettings.name === user.name){
      NavStore.setPath("FAV")
    }else{
      NavStore.setPath("MAIN")
    }

    const fetch = async () => {
      const userTracks = await axios.get<ITrack[]>(DEFAULT_API + "users/" + user.name);
      const newArr = await Promise.all(
        userTracks.data.map(async function (item) {
          const res = await axios.get(DEFAULT_API + "tracks/" + item);
          return res.data;
        })
      );
      setLoading(false);
      setTracksList(newArr);
    };
    fetch();
    return () => {
      fetch;
    };
  }, []);

  if (loading) {
    return (
      <Layout title={user.name}>
        <Spin />
      </Layout>
    );
  }
  return (
    <Layout title={user.name}>
      <div className="tracksList">
        <ProfileCard count={tracksList?.length} name={user.name} />
        {tracksList?.map((item, index) => {
          return (
            <TrackItem
              key={index}
              index={index + 1}
              name={item?.name}
              audio={item?.audio}
              artist={item?.artist}
              picture={item?.picture}
              id={item?._id}
              listens={item?.listens}
              hardLike={AuthStore.AuthSettings.name == user.name}
            />
          );
        })}
      </div>
    </Layout>
  );
  
});
export default Profile;

