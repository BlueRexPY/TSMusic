import styles from './Tracks.module.scss'
import Layout from '@/components/layout/Layout';
import { useEffect } from 'react';
import TrackItem from '@/components/layout/listItems/TrackItem';
import { useStores } from '@/store/useStore';
import { DEFUALT_API } from '@/utils//apiLinks';
import { observer } from 'mobx-react-lite';
import { ITrack } from '../../app/store/types';


const TracksPage = observer(() => {
  const { TracksStore } = useStores();

  useEffect(() => {
    TracksStore.feachTracks()
  }, [])
  const {tracksList} = TracksStore
  
  return (
    <Layout>
      <div className={styles.trackList}>
        {
          tracksList?.map((item,index) =>{
            return(
              <TrackItem key={index} index={index+1} name={item.name}  audio={DEFUALT_API+item.audio} artist={item.artist} picture={DEFUALT_API+item.picture} id={item._id}/>
            )
          })
        }
      </div>      
    </Layout>
  )

})

export default TracksPage
