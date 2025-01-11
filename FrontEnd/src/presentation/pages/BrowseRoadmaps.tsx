import BrowseRoadmapsComponent from "../components/browseRoadmaps/BrowseRoadmapsComponent";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BackgroundRays from "../components/OverView/BackgroundRays";
export default function BrowseRoadmaps() {
  return (
    <>
      <Header />
      <BackgroundRays option={2} fullPage={true} />

      <BrowseRoadmapsComponent />
      <Footer />
    </>
  );
}
