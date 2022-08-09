import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import { observer } from "mobx-react-lite";
import TrackItem from "@/components/layout/listItems/TrackItem";
import { Spin } from "antd";
import { IAlbume, ITrack } from "@/store/types";
import PlaylistCard from "@/components/layout/playlist/PlaylistCard";
import { useStores } from "@/hooks/useStore";

type album = {
  name: string;
};

const Playlist = observer((prpsAlbum: album) => {
  const [tracksList, setTracksList] = useState<ITrack[]>([]);
  const { PlaylistStore } = useStores();
  const [album, setAlbum] = useState<IAlbume>({
    _id: "id",
    name: "name",
    author: "author",
    listens: 0,
    picture: "image",
    tracks:["id"],
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetch = async () => {
      const resalbum = await axios.get<IAlbume>(DEFUALT_API + "albums/" + prpsAlbum.name);
      const dataAlbum:IAlbume = resalbum.data
      setAlbum(resalbum.data)
      const newArr = await Promise.all(
        dataAlbum.tracks.map(async function (item) {
          const res = await axios.get(DEFUALT_API + "tracks/" + item);
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
      <Layout title={album.name}>
        <Spin />
      </Layout>
    );
  } else {
    return (
      <Layout title={album.name}>
        <div className="tracksList">
          <PlaylistCard
            count={tracksList?.length}
            name={album.name}
            author={album.author}
            listens={album.listens}
            image={album.picture}
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
              />
            );
          })}
        </div>
      </Layout>
    );
  }
});
export default Playlist;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params?.name;
  return {
    props: {
      name: name,
    },
  };
};
