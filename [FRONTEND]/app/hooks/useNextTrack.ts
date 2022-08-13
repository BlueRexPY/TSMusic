import PlayerStore from '@/store/PlayerStore';
import { ITrack } from '@/store/types';
import { useListen } from '@/hooks/useListen';

type Props = {
    plus?: boolean;
    currentIndex: number;
    trackList: ITrack[];
};

export const useNextTrack = ({ plus = true, currentIndex, trackList }: Props) => {
    let nextItem = currentIndex

    if (plus) {
        if (currentIndex === trackList.length - 1) {
            nextItem = 0
        } else {
            nextItem = currentIndex + 1
        }

    } else {
        if (currentIndex === 0) {
            nextItem = trackList.length - 1
        } else {
            nextItem = currentIndex - 1
        }
    }


    PlayerStore.setActive();
    PlayerStore.setPlay();
    PlayerStore.setTrack({
        _id: trackList[nextItem]._id,
        name: trackList[nextItem].name,
        artist: trackList[nextItem].artist,
        listens: trackList[nextItem].listens,
        picture: trackList[nextItem].picture,
        audio: trackList[nextItem].audio,
    });
    useListen(trackList[nextItem]._id)
};