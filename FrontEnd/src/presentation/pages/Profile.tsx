import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/profile/UserInfo";
import EditProfile from "../components/profile/EditProfile";
import { useAuthStore } from "../../application/state/authStore";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
        <div className="max-w-6xl mx-auto">
          <UserInfo />
          <div className="dark:bg-slate-800 bg-slate-100 rounded-2xl p-8">
            <EditProfile />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
