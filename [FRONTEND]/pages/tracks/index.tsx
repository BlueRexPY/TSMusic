import styles from "./Tracks.module.scss";
import Layout from "@/components/layout/Layout";
import TrackItem from "@/layout/listItems/TrackItem";
import { useStores } from "@/hooks/useStore";
import { DEFAULT_API } from "@/utils//apiLinks";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Button, Input, Spin } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

const TracksPage = observer(() => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { TracksStore } = useStores();
  const [searchName, setSearchName] = useState("");
  const { tracksList } = TracksStore;
  const [filterTracksList, setFilterTracksList] = useState([]);
  const { AuthStore } = useStores();
  const { NavStore } = useStores();
  NavStore.setPath("TRACKS")

  const handleChange = (text: string) => {
    setSearchName(text);
    if (searchName != "") {
      axios
        .get(DEFAULT_API + "tracks/search/name?query=" + searchName)
        .then((resp) => setFilterTracksList(resp.data));
    }
  };

  const adminMode = () => {
    if (AuthStore.AuthSettings.roles.includes("ADMIN")) {
      return (
        <div className="createButton">
          <Button onClick={() => router.push("tracks/tools/create")}>
            <p className="gray">Create</p>
          </Button>
        </div>
      );
    }
  };

  useEffect(() => {
    TracksStore.fetchTracks();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Layout title="Tracks">
        <Spin />
      </Layout>
    );
  } 
  return (
    <Layout title="Tracks">
      <div className={styles.trackList}>
        <Input
          placeholder="Search"
          onChange={(e) => handleChange(e.target.value)}
          value={searchName}
          id="searchBar"
        />
        {(searchName != "" && filterTracksList.length != 0
          ? filterTracksList
          : tracksList
        )?.map((item, index) => {
          return (
            <TrackItem
              key={index}
              index={index + 1}
              name={item.name}
              audio={item.audio}
              artist={item.artist}
              picture={item.picture}
              listens={item.listens}
              id={item._id}
            />
          );
        })}
      </div>

      {adminMode()}
    </Layout>
  );
  
});

export default TracksPage;
