export type GradientTheme = {
  id: string;
  name: string;
  colors: {
    from: string;
    to: string;
  };
  class: string;
  iconColor: string;
};


export const gradientThemes: GradientTheme[] = [
  {
    id: "blue-purple",
    name: "Ocean Breeze",
    colors: {
      from: "#3B82F6",
      to: "#8B5CF6",
    },
    class: "from-blue-500 to-purple-500",
    iconColor: "text-blue-500",
  },
  {
    id: "emerald-teal",
    name: "Forest Mist",
    colors: {
      from: "#10B981",
      to: "#14B8A6",
    },
    class: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
  },
  {
    id: "rose-pink",
    name: "Sunset Glow",
    colors: {
      from: "#F43F5E",
      to: "#EC4899",
    },
    class: "from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
  },
  {
    id: "amber-orange",
    name: "Desert Sand",
    colors: {
      from: "#F59E0B",
      to: "#F97316",
    },
    class: "from-amber-500 to-orange-500",
    iconColor: "text-amber-500",
  },
  {
    id: "indigo-violet",
    name: "Twilight Sky",
    colors: {
      from: "#6366F1",
      to: "#8B5CF6",
    },
    class: "from-indigo-500 to-violet-500",
    iconColor: "text-indigo-500",
  },
  {
    id: "cyan-blue",
    name: "Arctic Ice",
    colors: {
      from: "#06B6D4",
      to: "#3B82F6",
    },
    class: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-500",
  },
];