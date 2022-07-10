import { useContext } from "react";
import { rootStoreContext } from './index';


export const useStores = () => useContext(rootStoreContext);
