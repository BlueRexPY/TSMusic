import Layout from "@/components/layout/Layout";
import BigLogo from "@/components/layout/icons/BigLogo";
import TopTrack from "@/components/layout/listItems/TopTrack";

const HomePage = () => {
  return (
    <Layout title="Main">
      <div id="small">
        <BigLogo />
        <TopTrack />
      </div>
    </Layout>
  );
};
export default HomePage;
