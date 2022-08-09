import "../styles/globals.css";
import type { AppProps } from "next/app";
require("../styles/variables.less");
import "antd/dist/antd.css";
import MusicBar from "@/components/layout/musicBar/MusicBar";
import Navigation from "@/components/layout/navigation/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <MusicBar/>
    <Navigation />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
