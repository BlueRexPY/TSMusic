import styles from './Navigation.module.scss'
import React from 'react'
import LogoIcon from '../icons/LogoIcon'
import HomeIcon from '../icons/HomeIcon'
import MusicIcon from '../icons/MusicIcon'
import AlbumIcon from '../icons/AlbumIcon'
import LikeIcon from '../icons/LikeIcon'
import { useRouter } from 'next/router'
type Props = {}

const Navigation = (props: Props) => {
  const router = useRouter()
  return (
    <div className={styles.nav_bar} >
      <LogoIcon/>
      <div onClick={()=>router.push('/')}>
        <HomeIcon/>
      </div>
      <div onClick={()=>router.push('/tracks')}>
        <MusicIcon/>
      </div>
      <div onClick={()=>router.push('/albums')}>
        <AlbumIcon/>
      </div>
      <div onClick={()=>router.push('/favorites')}>
        <LikeIcon/>
      </div>

    </div>
  )
}

export default Navigation