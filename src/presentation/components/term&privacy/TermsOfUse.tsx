import { motion } from "framer-motion";

const TermsOfUse = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.0 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <h2 className="text-3xl font-semibold text-theme mb-6">Terms of Use</h2>
        <p className="text-gray-700 dark:text-slate-200  mb-6">
          By using DevPath, you agree to these Terms of Use. If you do not
          agree, please do not use the website.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-4">
          Usage Guidelines
        </h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-slate-200 mb-6">
          <li>
            You must not use the website for unlawful or harmful purposes.
          </li>
          <li>
            Ensure the information you provide is accurate and up-to-date.
          </li>
          <li>
            Do not attempt to disrupt or compromise the website’s functionality.
          </li>
          <li>Refrain from sharing offensive or inappropriate content.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-4">
          Intellectual Property
        </h3>
        <p className="text-gray-700 dark:text-slate-200 mb-6">
          All content on DevPath, including roadmaps, designs, and code, is
          owned by or licensed to DevPath. You may not use this content without
          permission.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-4">
          Termination
        </h3>
        <p className="text-gray-700 dark:text-slate-200 mb-6">
          We reserve the right to terminate your access to the platform if you
          violate these Terms of Use or engage in activities that harm other
          users or the platform.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-50 mb-4">
          Limitation of Liability
        </h3>
        <p className="text-gray-700 dark:text-slate-200">
          DevPath is provided "as is" without warranties of any kind. We are not
          liable for any damages arising from the use of the website.
        </p>
      </motion.section>
    </>
  );
};

export default TermsOfUse;
