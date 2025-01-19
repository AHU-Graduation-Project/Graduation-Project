import { motion } from "framer-motion";
import PrivacyPolicy from "../components/term&privacy/PrivacyPolicy";
import TermsOfUse from "../components/term&privacy/TermsOfUse";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const PrivacyPolicyAndTerms: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-transparent py-10 px-6 z-20">
        <motion.div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 1.0 }}
          className="max-w-6xl mx-auto bg-white dark:bg-white/5 backdrop-blur-sm shadow-lg rounded-lg p-8"
        >
          <PrivacyPolicy />
          <TermsOfUse />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyAndTerms;
