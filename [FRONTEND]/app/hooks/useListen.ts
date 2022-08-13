import { DEFAULT_API } from '@/utils//apiLinks';
import axios from 'axios';



export const useListen = (id: string) => axios.post(DEFAULT_API + "tracks/listen/" + id);

