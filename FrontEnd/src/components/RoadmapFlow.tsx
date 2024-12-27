import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  Controls 
} from 'reactflow';
import "reactflow/dist/style.css";
import { roadmaps } from "../data/roadmaps";
import { useAuthStore } from "../store/authStore";
import NodeDetailsModal from "./NodeDetailsModal";
import RoadmapInfo from "./RoadmapInfo";
import ChatPanel from "./ChatPanel";
import CoursesSidebar from "./CoursesSidebar";
import RoadmapTopBar from "./RoadmapTopBar";
import { cn } from "../utils/cn";
import { AlertCircle, MessageCircle, BookOpen } from "lucide-react";
import { CustomNode } from "./CustomNode";


const nodeTypes = {
  custom: CustomNode,
};


{/* Update the initialNodes array to include jobs data */}
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
      isUnlocked: true,
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
      isUnlocked: false,
      requiredNodes: ["1"],
      jobs: 200,
    },
  },{
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
      requiredNodes: ["8"],
    },
  },
];


// Update the edges array to use different styles for topic and subtopic connections
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
    style: { strokeWidth: 2,strokeDasharray: "5,5" },
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


export default function RoadmapFlow() {
  const { id } = useParams();
  const roadmap = roadmaps.find((r) => r.id === id);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const { t } = useTranslation();
  const { user } = useAuthStore();

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

 const nodes = initialNodes.map((node) => {

   if (!node?.data) {
     console.error("Node data is missing:", node);
     return node; // Skip this node if data is missing
   }

   const nodeData = { ...node.data };
   const completedNodes = user?.progress?.[id || ""] || [];

   if (nodeData?.requiredNodes) {
     nodeData.isUnlocked = nodeData.requiredNodes.every((requiredId) =>
       completedNodes.includes(requiredId)
     );
   }

   return {
     ...node,
     data: {
       ...nodeData,
       onShowDetails: (nodeData: any) => setSelectedNode(nodeData),
       t,
     },
   };
 });

console.log(user);
  const completedNodes = user?.progress[id || ""]?.length || 0;
  const totalNodes = nodes.length;
  const progress = Math.round((completedNodes / totalNodes) * 100);


  return (
    <div className="relative ">
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
          className="bg-slate-50 dark:bg-slate-900"
        >
          <Background className="bg-slate-50 dark:bg-slate-900" />
          <Controls className="!bg-white/10 !rounded-lg" />
        </ReactFlow>
      </div>

      {/* Interactive Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
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
    </div>
  );
}