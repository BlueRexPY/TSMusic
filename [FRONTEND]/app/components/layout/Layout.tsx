import Head from "next/head";
import { FC, ReactChild, ReactNode } from "react";
import styles from "./Layout.module.css";
import MusicBar from "@/layout/musicBar/MusicBar";
import Navigation from "@/layout/navigation/Navigation";

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

  return (
    <div>
      <Head>
        <title>{`TSMusic - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`Music, Tracks, Artists, ${keywords}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <MusicBar />
      <div className="col">{props.children}</div>
    </div>
  );
};

export default Layout;
