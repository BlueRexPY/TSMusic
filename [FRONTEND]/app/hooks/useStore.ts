import { useContext } from "react";
import { rootStoreContext } from '../store/index';


export const useStores = () => useContext(rootStoreContext);
