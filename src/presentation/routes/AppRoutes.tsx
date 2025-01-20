import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import BrowseRoadmaps from '../pages/BrowseRoadmaps';
import GenerateRoadmap from '../pages/GenerateRoadmap';
import RoadmapFlow from '../pages/RoadmapFlow';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import NotFoundPage from '../pages/NotFoundPage';
import Editor from '../pages/editor';
import ConfirmPage from '../pages/ConfirmPage';
import RecoveryPassword from '../pages/recoveryPassword';
import TermsAndPrivacy from '../pages/TermsAndPrivacy';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/roadmaps" element={<BrowseRoadmaps />} />
      <Route path="/generate" element={<GenerateRoadmap />} />
      <Route path="/roadmap/:id" element={<RoadmapFlow />} />
      <Route path="/confirm-email" element={<ConfirmPage />} />
      <Route path="/recovery-password" element={<RecoveryPassword />} />
      <Route
        path="/auth"
        element={
          <div className="relative w-full h-screen ">
            {/* <Background /> */}
            <Auth />
          </div>
        }
      />
      <Route path="/term&privacy" element={<TermsAndPrivacy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editor/:slug" element={<Editor />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
