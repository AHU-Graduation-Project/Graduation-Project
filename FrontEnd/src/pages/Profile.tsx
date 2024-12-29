import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skills from "../components/Skills";
import UserInfo from "../components/UserInfo";
import EditProfile from "../components/EditProfile";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Profile() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <UserInfo />
        <EditProfile />
        <Skills />

        <div className="flex justify-end mt-5">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
