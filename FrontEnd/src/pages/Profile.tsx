import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import EditProfile from "../components/EditProfile";
import { useAuthStore } from "../store/authStore";
import { jsPDF } from "jspdf";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  // const handleDownload = () => {
  //   if (!user) {
  //     alert("User not logged in.");
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   // Header: Name and Contact Information
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(20);
  //   doc.text(`${user.fname} ${user.lname}`, 105, 20, { align: "center" });

  //   doc.setFontSize(12);
  //   doc.setFont("times", "normal");
  //   doc.text(`Email: ${user.email}`, 105, 30, { align: "center" });
  //   doc.text(`Position: ${user.position} | Level: ${user.level}`, 105, 40, {
  //     align: "center",
  //   });
  //   doc.text(`Country: ${user.country}`, 105, 50, { align: "center" });

  //   // Section: Profile Summary
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(16);
  //   doc.text("Profile Summary", 20, 70);

  //   doc.setFont("times", "normal");
  //   doc.setFontSize(12);
  //   doc.text(
  //     "A highly skilled professional with expertise in full-stack development, roadmap-driven growth, and a passion for delivering high-quality software solutions.",
  //     20,
  //     80,
  //     { maxWidth: 170 }
  //   );

  //   // Section: Skills
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(16);
  //   doc.text("Skills", 20, 100);

  //   doc.setFont("times", "normal");
  //   if (user.selectedSkills.length > 0) {
  //     user.selectedSkills.forEach((skill, index) => {
  //       doc.text(`- ${skill}`, 25, 110 + index * 10);
  //     });
  //   } else {
  //     doc.text("No skills added yet.", 25, 110);
  //   }

  //   // Section: Completed Roadmaps (Placeholder for experience)
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(16);
  //   doc.text("Experience", 20, 140);

  //   doc.setFont("times", "normal");
  //   if (user.completedRoadmaps.length > 0) {
  //     user.completedRoadmaps.forEach((roadmap, index) => {
  //       doc.text(`- Completed: ${roadmap}`, 25, 150 + index * 10);
  //     });
  //   } else {
  //     doc.text("No completed projects to display.", 25, 150);
  //   }

  //   // Section: Education (Mocked Data for Demonstration)
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(16);
  //   doc.text("Education", 20, 190);

  //   doc.setFont("times", "normal");
  //   doc.text("- Bachelor of Computer Science, University of Example", 25, 200);
  //   doc.text("- High School Diploma, Example High School", 25, 210);

  //   // Footer
  //   doc.setFontSize(10);
  //   doc.setFont("times", "italic");
  //   doc.text("Generated with MyRoadmap App", 105, 280, { align: "center" });

  //   // Download the PDF
  //   doc.save(`${user.fname}_${user.lname}_CV.pdf`);
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <UserInfo />
        <h1 className="text-4xl text-center mb-7 text-theme">
          Edit you're profile to maximize you're Learning experience.
        </h1>
        <EditProfile />
      </div>
    </div>
  );
}
