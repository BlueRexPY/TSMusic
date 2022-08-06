import Head from "next/head";
import { ReactChild, ReactNode, useEffect, useState } from "react";
import MusicBar from "@/layout/musicBar/MusicBar";
import Navigation from "@/layout/navigation/Navigation";
import ProfileMenu from "./profile/ProfileMenu";
import axios from "axios";
import { DEFUALT_API } from '@/utils//apiLinks';
import { useStores } from "@/hooks/useStore";
import { Spin } from "antd";

type Props = {
  children: ReactChild | ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout = (props: Props) => {
  const {
    title = "TSMusic - ",
    description = "Spotify clone online application",
    keywords = "Music, Tracks, Artists",
  } = props;
  const { AuthStore } = useStores();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   if(localStorage.getItem('userName')){
    axios.post(DEFUALT_API+'users/login/', { name: localStorage.getItem('userName'), password: localStorage.getItem('userPassword')})
   .then((resp) => {
     if(resp.data){
        AuthStore.Login(resp.data.name,resp.data.roles)
      }
   }).then(()=>setLoading(false))
   }else(
    setLoading(false)
   )
  }, [])

  const getContent = ()=>{
    if(!loading){
    return(
    <>
      <ProfileMenu/>
      <Navigation />
      <MusicBar />
      <div className="col">{props.children}</div>
    </>
    )}else{
      <Spin/>
    }
  }


  return (
    <div>
      <Head>
        <title>{`TSMusic - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`Music, Tracks, Artists, ${keywords}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

      {getContent()}
      
    </div>
  );
};

export default Layout;
