import { createContext } from "react";
import PlayerStore from "./PlayerStore";
import TracksStore from "./TracksStore";
import AuthStore from "./AuthStore";

export const rootStoreContext = createContext({
  PlayerStore, TracksStore, AuthStore
});
