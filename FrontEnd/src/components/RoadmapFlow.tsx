import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, { Node, Edge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { roadmaps } from "../data/roadmaps";
import { useAuthStore } from "../store/authStore";
import NodeDetailsModal from "./NodeDetailsModal";
import RoadmapInfo from "./RoadmapInfo";
import ChatPanel from "./ChatPanel";
import CoursesSidebar from "./CoursesSidebar";
import RoadmapTopBar from "./RoadmapTopBar";
import { cn } from "../utils/cn";
import {
  AlertCircle,
  MessageCircle,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import { CustomNode } from "./CustomNode";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import RatingModal from "./RatingModel";

const nodeTypes = {
  custom: CustomNode,
};


const initialNodes: Node[] = [

  {
    id: "1",
    type: "custom",
    position: { x: 400, y: 0 },
    data: {
      label: "HTML",
      type: "topic",
      description: "Learn the fundamentals of HTML markup language.",
      marketDemand: "High demand as the foundation of web development.",
      averageSalary: "$60,000 - $80,000",
      requiredSkills: ["Semantic HTML", "Forms", "Accessibility"],
      isAchieved: true,
      jobs: 150,
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 400, y: 100 },
    data: {
      label: "CSS",
      type: "topic",
      description: "Master styling and layout with CSS.",
      marketDemand: "Essential skill for frontend development.",
      averageSalary: "$65,000 - $85,000",
      requiredSkills: ["Flexbox", "Grid", "Responsive Design"],
      isAchieved: false,
      requiredNodes: ["1"],
      jobs: 200,
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 400, y: 200 },
    data: {
      label: "JavaScript",
      type: "topic",
      description: "Learn core JavaScript programming concepts.",
      marketDemand: "Very high demand with excellent job prospects.",
      averageSalary: "$80,000 - $120,000",
      requiredSkills: ["ES6+", "Async Programming", "DOM Manipulation"],
      isAchieved: false,
      requiredNodes: ["2"],
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 100, y: 200 },
    data: {
      label: "JS Syntax",
      type: "subtopic",
      description: "Master JavaScript syntax and core concepts.",
      marketDemand: "Fundamental skill for all JavaScript development.",
      averageSalary: "$75,000 - $95,000",
      requiredSkills: ["Variables", "Functions", "Objects"],
      isAchieved: false,
      requiredNodes: ["3"],
    },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 700, y: 200 },
    data: {
      label: "DOM",
      type: "subtopic",
      description: "Learn DOM manipulation and events.",
      marketDemand: "Essential for frontend development.",
      averageSalary: "$75,000 - $95,000",
      requiredSkills: ["Selectors", "Events", "Traversal"],
      isAchieved: false,
      requiredNodes: ["3"],
    },
  },
  {
    id: "6",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "React",
      type: "topic",
      description: "Build modern web applications with React.",
      marketDemand: "Very high demand for React developers.",
      averageSalary: "$90,000 - $140,000",
      requiredSkills: ["Components", "Hooks", "State Management"],
      isAchieved: false,
      requiredNodes: ["3"],
    },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 550, y: 300 },
    data: {
      label: "Angular",
      type: "topic",
      description: "Develop enterprise applications with Angular.",
      marketDemand: "Strong demand in enterprise environments.",
      averageSalary: "$95,000 - $145,000",
      requiredSkills: ["TypeScript", "RxJS", "Angular CLI"],
      isAchieved: false,
      requiredNodes: ["3"],
    },
  },
  {
    id: "8",
    type: "custom",
    position: { x: 400, y: 400 },
    data: {
      label: "VCS",
      type: "topic",
      description: "Learn version control with Git.",
      marketDemand: "Essential skill for all developers.",
      averageSalary: "$70,000 - $90,000",
      requiredSkills: ["Git", "GitHub", "Branching Strategies"],
      isAchieved: false,
      requiredNodes: ["6", "7"],
    },
  },
  {
    id: "9",
    type: "custom",
    position: { x: 400, y: 500 },
    data: {
      label: "SSR Vs CSR",
      type: "topic",
      description: "Understand server-side and client-side rendering.",
      marketDemand: "Growing demand for full-stack knowledge.",
      averageSalary: "$100,000 - $150,000",
      requiredSkills: ["Next.js", "Performance Optimization", "SEO"],
      isAchieved: false,
      requiredNodes: ["8"],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "left",
    targetHandle: "right",
    type: "smoothstep",
    style: { strokeWidth: 2, strokeDasharray: "5,5" }, // Thinner, dashed lines for subtopics
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    sourceHandle: "right",
    targetHandle: "left",
    type: "smoothstep",
    style: { strokeWidth: 2, strokeDasharray: "5,5" },
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e6-8",
    source: "6",
    target: "8",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
];
const floatingButtonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export default function RoadmapFlow() {
  const { id } = useParams();
  const roadmap = roadmaps.find((r) => r.id === id);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const { user } = useAuthStore();

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const nodes = initialNodes.map((node) => {
    if (!node?.data) {
      console.error("Node data is missing:", node);
      return node;
    }

    const nodeData = { ...node.data };
    const completedNodes = user?.progress?.[id || ""] || [];

    // Check if this is a main topic and if all its subtopics are completed
    if (nodeData.type === "topic") {
      const subtopics = initialNodes.filter(
        (n) =>
          n.data?.type === "subtopic" &&
          n.data?.requiredNodes?.includes(node.id)
      );

      if (subtopics.length > 0) {
        const allSubtopicsCompleted = subtopics.every((subtopic) =>
          completedNodes.includes(subtopic.id)
        );
        if (allSubtopicsCompleted) {
          nodeData.isAchieved = true;
          // Add the main topic to completed nodes if not already there
          if (!completedNodes.includes(node.id)) {
            completedNodes.push(node.id);
          }
        }
      }
    }

    // Original achievement logic for dependencies
    if (nodeData?.requiredNodes) {
      nodeData.isAchieved = nodeData.requiredNodes.every((requiredId) =>
        completedNodes.includes(requiredId)
      );
    }

    return {
      ...node,
      data: {
        ...nodeData,
        onShowDetails: (nodeData: any) => setSelectedNode(nodeData),
      },
    };
  });

  const completedNodes = user?.progress[id || ""]?.length || 0;
  const totalNodes = nodes.length;
  const progress = Math.round((completedNodes / totalNodes) * 100);

  const toggleFloatingMenu = () => {
    setShowFloatingMenu(!showFloatingMenu);
    if (!showFloatingMenu) {
      setShowInfo(false);
      setShowChat(false);
      setShowCourses(false);
    }
  };
  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log("Rating:", rating, "Comment:", comment);
    // Here you would typically send this to your backend
  };
  return (
    <div className="relative">
      {/* Top Bar */}
      <RoadmapTopBar
        roadmap={roadmap}
        progress={progress}
        completedNodes={completedNodes}
        totalNodes={totalNodes}
        nodes={nodes}
        edges={initialEdges}
      />

      {/* Main Flow Area */}
      <div className="h-[calc(100vh-5rem)]">
        <ReactFlow
          nodes={nodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 20 }}
          className="bg-slate-50 dark:bg-slate-900"
        >
          <Background className="bg-slate-50 dark:bg-slate-900" />
          <Controls className="!bg-white/10 !rounded-lg" />
        </ReactFlow>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <AnimatePresence mode="popLayout">
          {showFloatingMenu && (
            <>
              <motion.div
                className="relative group"
                variants={floatingButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={3}
                key="rating-button"
              >
                <button
                  onClick={() => setShowRating(true)}
                  className={cn(
                    "p-4 rounded-full shadow-lg transition-all",
                    "bg-theme text-white",
                    "hover:scale-110"
                  )}
                >
                  <Star className="w-6 h-6" />
                </button>
                <motion.div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  Rate Roadmap
                </motion.div>
              </motion.div>
              <motion.div
                className="relative group"
                variants={floatingButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={2}
                key="courses-button"
              >
                <button
                  onClick={() => setShowCourses(!showCourses)}
                  className={cn(
                    "p-4 rounded-full shadow-lg transition-all",
                    "bg-theme text-white",
                    "hover:scale-110",
                    showCourses && "ring-4 ring-purple-500/20"
                  )}
                >
                  <BookOpen className="w-6 h-6" />
                </button>
                <motion.div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  View Courses
                </motion.div>
              </motion.div>

              <motion.div
                className="relative group"
                variants={floatingButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={1}
                key="chat-button"
              >
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={cn(
                    "p-4 rounded-full shadow-lg transition-all",
                    "bg-theme text-white",
                    "hover:scale-110",
                    showChat && "ring-4 ring-purple-500/20"
                  )}
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <motion.div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  AI Assistant
                </motion.div>
              </motion.div>

              <motion.div
                className="relative group"
                variants={floatingButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0}
                key="info-button"
              >
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={cn(
                    "p-4 rounded-full shadow-lg transition-all",
                    "bg-theme text-white",
                    "hover:scale-110",
                    showInfo && "ring-4 ring-purple-500/20"
                  )}
                >
                  <AlertCircle className="w-6 h-6" />
                </button>
                <motion.div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  Roadmap Info
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleFloatingMenu}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all",
            "bg-theme text-white",
            "hover:scale-110",
            showFloatingMenu && "ring-4 ring-slate-800/20  dark:ring-white/20"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: showFloatingMenu ? 180 : 0,
          }}
        >
          <MoreVertical className="w-6 h-6" />
        </motion.button>
      </div>
      {/* Modals and Panels */}
      <NodeDetailsModal
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        node={selectedNode}
      />
      <RoadmapInfo
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        roadmap={roadmap}
      />
      <ChatPanel
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        roadmap={roadmap}
        userProgress={user?.progress[id || ""]}
      />
      <CoursesSidebar
        isOpen={showCourses}
        onClose={() => setShowCourses(false)}
        topic={selectedNode?.label}
      />
      <RatingModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
