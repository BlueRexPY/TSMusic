import { createContext } from "react";
import PlayerStore from "./PlayerStore";
import TracksStore from "./TracksStore";

export const rootStoreContext = createContext({
  PlayerStore,TracksStore
});
