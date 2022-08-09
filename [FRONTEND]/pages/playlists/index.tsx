import React, {useState, useEffect} from "react";
import Layout from "@/components/layout/Layout";
import { useStores } from "@/hooks/useStore";
import { useRouter } from "next/router";
import { Button, Input, Spin } from "antd";
import styles from "./Playlists.module.scss";
import { DEFUALT_API } from "@/utils//apiLinks";
import axios from 'axios';
import PlaylistCardItem from "@/components/layout/listItems/PlaylistCarditem";
import { observer } from 'mobx-react-lite';

const Playlists = observer(() => {
  const { AuthStore } = useStores();
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [filterPlaylistList, setFilterPlaylistList] = useState([]);
  const { PlaylistStore } = useStores();
  const { playlistList } = PlaylistStore;
  const [loading, setLoading] = useState(true);

  const userMode = () => {
    if (AuthStore.AuthSettings.roles.includes("USER")) {
      return (
        <div className="createButton">
          <Button onClick={() => router.push("playlists/tools/create")}>
            <p className="gray">Create</p>
          </Button>
        </div>
      );
    }
  };

  const handleChange = (text: string) => {
    setSearchName(text);
    if (searchName != "") {
      axios
        .get(DEFUALT_API + "albums/search/name?query=" + searchName)
        .then((resp) => setFilterPlaylistList(resp.data));
    }
  };
  useEffect(() => {
    PlaylistStore.fetchPlaylist();
    console.log('useeffect work!')
    setLoading(false);
  }, [])

  if(!loading){
    return <Layout title="playlist">
    <div className={styles.palylistList}>
          <Input
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
            value={searchName}
            id="searchBar"
          />
          {(searchName != "" && filterPlaylistList.length != 0
            ? filterPlaylistList
            : playlistList
          )?.map((item,index) => {
            return (
              <PlaylistCardItem
              count={item.tracks.length}
              key={index}
              name={item.name}
              picture={DEFUALT_API + item.picture}
              id={item._id}
            />
            );
          })}
        </div>
    {userMode()}
  </Layout>;
  }else{
    return(
      <Layout title="playlist">
        <Spin></Spin>
      </Layout>
    )
  }
})

export default Playlists;
