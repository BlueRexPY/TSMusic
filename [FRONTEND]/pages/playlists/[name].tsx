import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import { observer } from "mobx-react-lite";
import TrackItem from "@/components/layout/listItems/TrackItem";
import { Spin } from "antd";
import { ITrack } from "@/store/types";
import PlaylistCard from "@/components/layout/playlist/PlaylistCard";

type album = {
  name: string;
  author: string;
  tracks: string[];
  listens: number;
  image: string;
};

const Playlist = observer((album: album) => {
  const [tracksList, setTracksList] = useState<ITrack[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetch = async () => {
      const newArr = await Promise.all(
        album.tracks.map(async function (item) {
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
            image={album.image}
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
  const response = await axios.get(DEFUALT_API + "albums/" + params?.name);

  return {
    props: {
      tracks: response.data.tracks,
      name: name,
      author: response.data.author,
      listens: response.data.listens,
      image: response.data.picture,
    },
  };
};
