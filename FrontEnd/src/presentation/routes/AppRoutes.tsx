import { Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview";
import BrowseRoadmaps from "../pages/BrowseRoadmaps";
import GenerateRoadmap from "../pages/GenerateRoadmap";
import RoadmapFlow from "../pages/RoadmapFlow";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import NotFoundPage from "../pages/NotFoundPage";
import Background from "../components/layout/Background";

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/roadmaps" element={<BrowseRoadmaps />} />
      <Route path="/generate" element={<GenerateRoadmap />} />
      <Route path="/roadmap/:id" element={<RoadmapFlow />} />
      <Route
        path="/Auth"
        element={
          <div className="relative w-full h-screen">
            <Background />
            <Auth />
          </div>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}