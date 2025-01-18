import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <motion.h1
        className="text-3xl font-bold text-center text-theme mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        DevPath - Privacy Policy and Terms of Use
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <h2 className="text-3xl font-semibold text-theme  mb-5">
          Privacy Policy
        </h2>
        <p className="text-gray-700 dark:text-slate-200 mb-7">
          Welcome to DevPath. Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-2">
          Information We Collect
        </h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-slate-200 mb-6">
          <li>Your name and email address when you register on the website.</li>
          <li>
            Details about your skills and selected roadmaps to enhance your
            experience.
          </li>
          <li>
            Technical information such as your IP address, browser type, and
            usage statistics.
          </li>
          <li>Feedback and interactions on the platform.</li>
          <li>
            Any additional data provided during surveys or customer support
            requests.
          </li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-4">
          How We Use Your Information
        </h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-slate-100 mb-6">
          <li>To personalize your experience on DevPath.</li>
          <li>To improve our website and provide better roadmaps.</li>
          <li>To communicate updates and respond to your inquiries.</li>
          <li>To monitor and enhance platform performance and security.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50  mb-4">
          Data Protection
        </h3>
        <p className="text-gray-700 dark:text-slate-100 mb-6">
          We take appropriate measures to protect your data from unauthorized
          access. However, please note that no online platform can guarantee
          absolute security.
        </p>
        <p className="text-gray-700 dark:text-slate-100">
          Users are responsible for maintaining the confidentiality of their
          account credentials. If you suspect unauthorized access to your
          account, notify us immediately.
        </p>
      </motion.section>
    </>
  );
};

export default PrivacyPolicy;
