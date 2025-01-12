import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/profile/UserInfo";
import EditProfile from "../components/profile/EditProfile";
import { useAuthStore } from "../../application/state/authStore";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";
// import BackgroundRays from "../components/OverView/BackgroundRays";

export default function Profile() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* <BackgroundRays option={2} fullPage={true} /> */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="max-w-6xl mx-auto"
        >
          <UserInfo />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-theme "
          >
            Edit you're profile to maximize you're Learning experience.
          </motion.h1>

          <EditProfile />
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
