import Image from 'next/image'
import styles from './MusicBar.module.scss'
import React, { useEffect, useState } from 'react'
import trackImg from '@/assets/img/digitalFantasy.png'
import NextIcon from '@/icons/NextIcon'
import StopIcon from '@/icons/StopIcon'
import BackIcon from '@/icons/BackIcon'
import { Slider } from 'antd'
import VolumeIcon from '@/icons/VolumeIcon'
import PlayIcon from '../icons/PlayIcon'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/store/useStore'

let audio:HTMLAudioElement;

const MusicBar = observer(() => {
    const { PlayerStore } = useStores();
    const {volume, duration, currentTime, pause,active} = PlayerStore.PlayerSettings
    const {name, artist, picture} = PlayerStore.PlayerSettings.track
    
    useEffect(() => {
        audio = new Audio(PlayerStore.PlayerSettings.track.audio)
        audio.currentTime = currentTime
        return () => {
            audio.pause()
          }
    }, [active])

    useEffect(() => {
        audio.src = (PlayerStore.PlayerSettings.track.audio)
    }, [PlayerStore.PlayerSettings.track])

    useEffect(() => {
        if(active){
            if(!pause){
                audio.play()
            }else{
                audio.pause()
            }
            audio.onloadeddata = () => PlayerStore.setDuration(audio.duration)
            audio.ontimeupdate = () => PlayerStore.setCurrentTime(audio.currentTime)
        }
    }, [currentTime,audio,pause])

    
   
    const getVolumeBackgroundSize = () => {
        return {
            backgroundSize: `${(volume * 100) / 100}% 100%`,
        };
    };

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${((currentTime / duration) * 100)+0.4}% 100%`
        };
    };

    const changePause = ()=>{
        if(pause){
            PlayerStore.setPlay()
        }else{
            PlayerStore.setPause()
        }
    }

    const changeVolume = (value:string) =>{
        audio.volume = parseInt(value) / 100
        PlayerStore.setVolume(parseInt(value))
    }

    const changeCurrentTime  = (value:string) =>{
        audio.currentTime = parseInt(value) 
        PlayerStore.setCurrentTime(parseInt(value))
    }

  return (
    <div className={styles.music_bar} style={!active?{display:"none"}:{display:"flex"}}>
        <input type="range" id='track_line' min="0" max={duration} onChange={(e) => changeCurrentTime(e.target.value)} value={currentTime} style={getBackgroundSize()}></input>

        <div className={styles.music_side}>
            <Image src={trackImg} width={80} height={80} alt="tsmusic" draggable={false}/>

            <div className={styles.music_name}>
                <p className='white fs_24'>{name}</p>
                <p className='white fs_20'>{artist}</p>
            </div>
        </div>

        <div className='row'>
            <p className='white  fs_24'>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime - ( Math.floor(currentTime / 60) * 60)) < 10 ? "0" : "")}{Math.floor(currentTime - ( Math.floor(currentTime / 60) * 60))}</p>
        </div>

        <div className='row'>
            <BackIcon/>
            <div onClick={()=>{changePause()}}>
            {!pause? <PlayIcon/>:<StopIcon/>}
            </div>
            <NextIcon/>
        </div>

        <div className='row'>
            <p className='gray fs_24'>{Math.floor(duration / 60)}:{(Math.floor(duration - ( Math.floor(duration / 60) * 60)) < 10 ? "0" : "")}{Math.floor(duration - ( Math.floor(duration / 60) * 60))}</p>
        </div>

        <div className={styles.volume}>
            <VolumeIcon/>
            <input type="range" id='volume_line' min="0" max={100} onChange={(e) => changeVolume(e.target.value)} style={getVolumeBackgroundSize()} value={volume}></input>
        </div>
    </div>
  )
})

export default MusicBar