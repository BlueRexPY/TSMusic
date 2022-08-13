import { createContext } from "react";
import PlayerStore from "./PlayerStore";
import TracksStore from "./TracksStore";
import PlaylistStore from "./PlaylistStore";
import AuthStore from "./AuthStore";
import NavStore from "./NavStore";

export const rootStoreContext = createContext({
  PlayerStore, TracksStore, AuthStore, PlaylistStore,NavStore
});
