import OverviewComponent from "../components/OverView/OverviewComponent";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import BackgroundRays from "../components/OverView/BackgroundRays";

export default function Overview() {
  return (
    <>
      <BackgroundRays option={1} fullPage={true} />
      <Header />
      <OverviewComponent />
      <Footer />
    </>
  );
}
