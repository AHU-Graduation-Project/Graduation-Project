import {
  Code2,
  Palette,
  Server,
  Smartphone,
  Brain,
  Database,
} from "lucide-react";
import GeneratorResources from "../presentation/components/generator/GeneratorResources";

export const roadmaps = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Learn to build modern web interfaces with HTML, CSS, JavaScript, and React",
    icon: Code2,
  Resources: [{title : "example" , icon : "icon" , link : "link"}],
    color: "from-blue-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Master server-side programming, APIs, and database management",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ui-design",
    title: "UI/UX Design",
    description: "Learn design principles, user research, and prototyping",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Build native and cross-platform mobile applications",
    icon: Smartphone,
    color: "from-orange-500 to-red-500",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Explore artificial intelligence and machine learning concepts",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Learn cloud platforms, CI/CD, and infrastructure management",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];
