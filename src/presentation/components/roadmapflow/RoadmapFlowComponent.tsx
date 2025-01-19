import { useState, useCallback  , useEffect} from "react";
import { useParams } from "react-router-dom";
import { roadmaps } from "../../../data/roadmaps";
import { useAuthStore } from "../../../application/state/authStore";
import RoadmapTopBar from "./RoadmapTopBar";
import { CustomNode } from "./CustomNode";
import ModalsAndPanels from "./ModalsAndPanels";
import { initialNodes, initialEdges } from "../../../data/testRoadmap";
import FlowArea from "./FlowArea";
import FloatingMenu from "./FloatingMenu";
import { GetRoadmapById } from "../../../infrastructure/api/getroadmapbyid";
const nodeTypes = {
  custom: CustomNode,
};

export default function RoadmapFlowComponent() {
  const { id } = useParams();
  const roadmap = roadmaps[0]
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [ShowDetails , setShowDetails] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const { user } = useAuthStore();
  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);


    const [roadmapData, setRoadmapData] = useState<any>(null);
    const [nodess, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);

    const getRoadmap = GetRoadmapById();
    useEffect(() => {
      const fetchRoadmap = async () => {
        try {
          const response = await getRoadmap.execute(id);
          const { roadmap } = response;
          setRoadmapData(roadmap);
          setNodes(roadmap.topics as unknown as Node[]);
          setEdges(roadmap.edges as unknown as Edge[]);
        } catch (error) {
          console.error('Failed to fetch roadmap:', error);
        }
      };

      fetchRoadmap();
    }, [id]);
  const nodes = nodess.map((node) => {
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
          n.data?.prerequisites?.includes(node.id)
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
    if (nodeData?.prerequisites) {
      nodeData.isAchieved = nodeData.prerequisites.every((requiredId) =>
        completedNodes.includes(requiredId)
      );
    }

    return {
      ...node,
      data: {
        ...nodeData,
        onShowDetails: (nodeData: any) => {
          setShowDetails(true);
          setSelectedNode(nodeData)},
        onShowCourses: (nodeData: any) => {
          setSelectedNode(nodeData);
          setShowCourses(true); 
      }}
    };
  });

  const completedNodes = user?.progress[id || ""]?.length || 0;
  const totalNodes = nodes.length;
  const progress = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="relative">
      {/* Top Bar */}
      <RoadmapTopBar
        roadmap={roadmap}
        progress={progress}
        completedNodes={completedNodes}
        totalNodes={totalNodes}
        nodes={nodes}
        edges={edges}
      />

      {/* Main Flow Area */}
      <FlowArea
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      />
      <FloatingMenu
        showFloatingMenu={showFloatingMenu}
        setShowFloatingMenu={setShowFloatingMenu}
        setShowInfo={setShowInfo}
        setShowChat={setShowChat}
        setShowCourses={setShowCourses}
        setShowRating={setShowRating}
        showInfo={showInfo}
        showChat={showChat}
        showCourses={showCourses}
      />
      {/* Modals and Panels */}
      <ModalsAndPanels
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        showChat={showChat}
        setShowChat={setShowChat}
        showDetails={ShowDetails}
        setShowDetails={setShowDetails}
        showCourses={showCourses}
        setShowCourses={setShowCourses}
        showRating={showRating}
        setShowRating={setShowRating}
        roadmap={roadmap}
        userProgress={user?.progress[id || ""]}
      />
    </div>
  );
}
