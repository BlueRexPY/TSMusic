import Image from "next/image";Image
import styles from "./MusicBar.module.scss";
import React, { useEffect, useState } from "react";
import NextIcon from "@/icons/NextIcon";
import StopIcon from "@/icons/StopIcon";
import BackIcon from "@/icons/BackIcon";
import VolumeIcon from "@/icons/VolumeIcon";
import PlayIcon from "../icons/PlayIcon";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStore";
import { useRouter } from "next/router";
import { useNextTrack } from "@/hooks/useNextTrack";
import TracksStore from "@/store/TracksStore";

let audio: HTMLAudioElement;

const MusicBar = observer(() => {
  const SECONDS_IN_MINUTE = 60;
  const router = useRouter();
  const { tracksList } = TracksStore;
  const { PlayerStore } = useStores();
  const { volume, duration, currentTime, pause, active } =
    PlayerStore.PlayerSettings;
  const { name, artist, picture } = PlayerStore.PlayerSettings.track;
  const [mute, setMute] = useState(false)


  const changeMute = () =>{
    setMute(!mute)
    if(!mute){
      audio.volume = 0
    }else{
      audio.volume = volume / 100;
    }

  }
  useEffect(() => {
    audio = new Audio(PlayerStore.PlayerSettings.track.audio);
    audio.currentTime = currentTime;
    audio.volume = volume / 100;
    return () => {
      audio.pause();
    };
  }, [active]);

  useEffect(() => {
    audio.src = PlayerStore.PlayerSettings.track.audio;
  }, [PlayerStore.PlayerSettings.track]);

  useEffect(() => {
    if (active) {
      if (!pause) {
        audio.play();
      } else {
        audio.pause();
      }
      if (currentTime >= audio.duration) {
        const currentIndex = tracksList.findIndex(
          (i) => i._id == PlayerStore.PlayerSettings.track._id
        );
        useNextTrack({
          plus: true,
          currentIndex: currentIndex,
          trackList: tracksList,
        });
      }
      audio.onloadeddata = () => PlayerStore.setDuration(audio.duration);
      audio.ontimeupdate = () => PlayerStore.setCurrentTime(audio.currentTime);
    }
  }, [currentTime, audio, pause]);

  const getVolumeBackgroundSize = () => {
    return {
      backgroundSize: `${(volume * 100) / 100}% 100%`,
    };
  };

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(currentTime / duration) * 100 + 0.4}% 100%`,
    };
  };

  const changePause = () => {
    if (pause) {
      PlayerStore.setPlay();
    } else {
      PlayerStore.setPause();
    }
  };

  const ToNextTrack = (plus: boolean) => {
    const currentIndex = tracksList.findIndex(
      (i) => i._id == PlayerStore.PlayerSettings.track._id
    );
    useNextTrack({
      plus: plus,
      currentIndex: currentIndex,
      trackList: tracksList,
    });
  };

  const changeVolume = (value: string) => {
    audio.volume = parseInt(value) / 100;
    PlayerStore.setVolume(parseInt(value));
  };

  const changeCurrentTime = (value: string) => {
    audio.currentTime = parseInt(value);
    PlayerStore.setCurrentTime(parseInt(value));
  };

  return (
    <div
      className={styles.music_bar}
      style={!active ? { display: "none" } : { display: "flex" }}
    >
      <input
        type="range"
        id="track_line"
        min="0"
        max={duration}
        onChange={(e) => changeCurrentTime(e.target.value)}
        value={currentTime}
        style={getBackgroundSize()}
      ></input>

      <div className={styles.music_side}>
        <div id="imageMusicBar">
          <Image
            src={picture}
            loader={() => picture}
            width={80}
            height={80}
            alt="tsmusic"
            draggable={false}
          />
        </div>
        <div className={styles.music_name}>
          <p className="white fs_20">{name}</p>
          <p
            className="white fs_16 clickable"
            onClick={() => router.push("/tracks/" + artist)}
          >
            {artist}
          </p>
        </div>
      </div>

      <div className="row">
        <p className="white fs_24" id="time">
          {Math.floor(currentTime / SECONDS_IN_MINUTE)}:
          {Math.floor(currentTime - Math.floor(currentTime / SECONDS_IN_MINUTE) * SECONDS_IN_MINUTE) < 10
            ? "0"
            : ""}
          {Math.floor(currentTime - Math.floor(currentTime / SECONDS_IN_MINUTE) * SECONDS_IN_MINUTE)}
        </p>
      </div>

      <div className="row">
        <div onClick={() => ToNextTrack(false)}>
          <BackIcon />
        </div>
        <div
          onClick={() => {
            changePause();
          }}
        >
          {!pause ? <PlayIcon /> : <StopIcon />}
        </div>
        <div onClick={() => ToNextTrack(true)}>
          <NextIcon />
        </div>
      </div>

      <div className="row">
        <p className="gray fs_24" id="time">
          {Math.floor(duration / SECONDS_IN_MINUTE)}:
          {Math.floor(duration - Math.floor(duration / SECONDS_IN_MINUTE) * SECONDS_IN_MINUTE) < 10
            ? "0"
            : ""}
          {Math.floor(duration - Math.floor(duration / SECONDS_IN_MINUTE) * SECONDS_IN_MINUTE)}
        </p>
      </div>

      <div className={styles.volume}>
        <div onClick={()=>changeMute()}>
          <VolumeIcon volume={mute?0:volume}/>
        </div>
        
        <input
          type="range"
          id="volume_line"
          min="0"
          max={100}
          onChange={(e) => changeVolume(e.target.value)}
          style={getVolumeBackgroundSize()}
          value={volume}
        ></input>
      </div>
    </div>
  );
});

export default MusicBar;
