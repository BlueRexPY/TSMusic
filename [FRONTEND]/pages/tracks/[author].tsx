import { observer } from "mobx-react-lite";
import Layout from "@/components/layout/Layout";
import styles from "./Tracks.module.scss";
import { DEFUALT_API } from "@/utils//apiLinks";
import TrackItem from "@/components/layout/listItems/TrackItem";
import { GetServerSideProps } from "next";
import axios from "axios";
import React, { useState } from "react";
import AuthorItem from "@/components/layout/listItems/AuthorItem";
import { ITrack } from "@/store/types";

type author = {
  author: ITrack[];
};

const AuthorPage = observer((author:author) => {
  const [tracksList, setTracksList] = useState<ITrack[]>(author.author);

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
  const response = await axios.get(
    DEFUALT_API + "tracks/search/artist?query=" + params?.author
  );
  return {
    props: {
      author: response.data,
    },
  };
};
