import { observer } from "mobx-react-lite";
import Layout from "@/components/layout/Layout";
import { DEFUALT_API } from "@/utils//apiLinks";
import TrackItem from "@/components/layout/listItems/TrackItem";
import { GetServerSideProps } from "next";
import axios from "axios";
import React, { useState,useEffect } from "react";
import AuthorItem from "@/components/layout/listItems/AuthorItem";
import { ITrack } from "@/store/types";
import { useStores } from "@/hooks/useStore";

type author = {
  author: string;
};

const AuthorPage = observer((author: author) => {
  const { TracksStore } = useStores();
  const [tracksList, setTracksList] = useState<ITrack[]>([TracksStore.tracksList[0]]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get<ITrack[]>(
        DEFUALT_API + "tracks/search/artist?query=" + author
      );
      setTracksList(res.data)
    }

    fetch();
    return () => {
      fetch;
    };
  }, [])
  

  return (
    <Layout title={tracksList[0].artist} keywords={tracksList[0].artist}>
      <div className="tracksList">
        <AuthorItem
          count={tracksList.length}
          artist={tracksList[0].artist}
          picture={DEFUALT_API + tracksList[0].picture}
        />
        {tracksList?.map((item, index) => {
          return (
            <TrackItem
              key={index}
              index={index + 1}
              name={item.name}
              audio={DEFUALT_API + item.audio}
              artist={item.artist}
              picture={DEFUALT_API + item.picture}
              id={item._id}
              listens={item.listens}
            />
          );
        })}
      </div>
    </Layout>
  );
});

export default AuthorPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const author = params?.author
  return {
    props: {
      author: author
    },
  };
};
