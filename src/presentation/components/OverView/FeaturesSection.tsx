import { Brain, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description:
        "AI-powered roadmaps tailored to your goals and experience level. Track your progress and stay motivated with personalized recommendations.",
      imageUrl:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      linkText: "Generate Your Path",
      linkUrl: "/generate",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Brain,
      title: "Explore Roadmaps",
      description:
        "Discover comprehensive roadmaps for IT career paths, covering essential skills, learning resources, and growth strategies. Start your journey today!",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      linkText: "Explore roadmaps",
      linkUrl: "/roadmaps",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="text-theme text-transparent bg-clip-text">
              succeed
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Comprehensive tools and resources to guide your tech journey from
            start to finish
          </p>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-16`}
            >
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-300/30 via-gray-400/20 to-gray-300/30 dark:from-gray-900/40 dark:via-gray-800/20 dark:to-gray-900/40" />
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl dark:bg-white/5 dark:border-gray-700">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {feature.description}
                  </p>

                  <motion.a
                    href={feature.linkUrl}
                    className="inline-flex items-center text-theme hover:opacity-80 font-medium dark:text-theme-light"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {feature.linkText}
                    <TrendingUp className="ml-2 w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              <motion.div
                className="flex-1 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-theme/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-300" />
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-video"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}