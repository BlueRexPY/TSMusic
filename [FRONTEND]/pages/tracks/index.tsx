import styles from './Tracks.module.scss'
import Layout from '@/components/layout/Layout';
import LikeIcon from '@/components/layout/icons/LikeIcon';
import { useState } from 'react';
import TrackItem from '@/components/layout/listItems/TrackItem';


const TracksPage = () => {
  const [trackList, setTreackList] = useState([
    {_id: "0",
    name: "Title",
    artist: "artist",
    listens: 0,
    picture: "https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png",
    audio: "https://mp3uk.net/mp3/files/gone-fludd-traxxxmania-mp3.mp3",
    duration: 213},
    {_id: "0",
    name: "Title",
    artist: "artist",
    listens: 0,
    picture: "https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png",
    audio: "https://mp3uk.net/mp3/files/gone-fludd-traxxxmania-mp3.mp3",
    duration: 213},
    {_id: "0",
    name: "Title",
    artist: "artist",
    listens: 0,
    picture: "https://images.genius.com/7fb8dbfbac9ee513ac03718a1d77bf42.1000x1000x1.png",
    audio: "https://mp3uk.net/mp3/files/deti-rave-1-2-123-mp3.mp3",
    duration: 213},
  ])


  return (
    <Layout>
      <div className={styles.trackList}>
        {
          trackList?.map((item,index) =>{
            return(
              <TrackItem key={index} index={index+1} name={item.name} duration={item.duration} audio={item.audio} artist={item.artist} picture={item.picture} id={item._id}/>
            )
          })
        }
      </div>      
    </Layout>
  )
}

export default TracksPage
