import Layout from '@/components/layout/Layout'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { DEFUALT_API } from '@/utils//apiLinks';
import { observer } from 'mobx-react-lite';
import TrackItem from '@/components/layout/listItems/TrackItem';
import ProfileCard from '@/components/layout/profile/ProfileCard';
import { useStores } from '@/hooks/useStore';
import { Spin } from 'antd';
import { ITrack } from '@/store/types';

type user = {
  name: string;
  tracks: string[];
};

const Profile = observer((user:user) => {
  const [tracksList, setTracksList] = useState<ITrack[]>([])
  const { AuthStore } = useStores();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const feach = async () => {
        const newArr = await Promise.all(user.tracks.map(async function(item){
          const res = await axios.get(DEFUALT_API+"tracks/"+item)
          return res.data
        }))
        setLoading(false)
        setTracksList(newArr);
      }
    feach()  
  }, [])


  if(loading){
    return (
      <Layout title={user.name}><Spin/></Layout>)
  }else{
  return (
    <Layout title={user.name}>
     <div className="tracksList">
        <ProfileCard
          count={tracksList?.length}
          name={user.name}
        />
        {tracksList?.map((item, index) => {
          return (
            <TrackItem
              key={index}
              index={index + 1}
              name={item?.name}
              audio={DEFUALT_API + item?.audio}
              artist={item?.artist}
              picture={DEFUALT_API + item?.picture}
              id={item?._id}
              listens={item?.listens}
              hardLike={AuthStore.AuthSettings.name==user.name}
            />
          );
        })}
      </div>
    </Layout>
  )}
})
export default Profile

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params?.name
  const response = await axios.get(
    DEFUALT_API + "users/" + params?.name
  );
  
  return {
    props: {
      tracks: response.data,
      name: name
    },
  };
};