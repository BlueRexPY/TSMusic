import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import BigLogo from "@/components/layout/icons/BigLogo";
import TopTrack from "@/components/layout/listItems/TopTrack";

const HomePage: NextPage = () => {
  return (
    <Layout title="Main">
      <BigLogo />
      <TopTrack />
    </Layout>
  );
};
export default HomePage;
