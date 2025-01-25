import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edge, Node } from 'reactflow';
import { roadmaps } from '../../../data/roadmaps';
import { useAuthStore } from '../../../application/state/authStore';
import RoadmapTopBar from './RoadmapTopBar';
import { CustomNode } from './CustomNode';
import ModalsAndPanels from './ModalsAndPanels';
import { initialNodes, initialEdges } from '../../../data/testRoadmap';
import FlowArea from './FlowArea';
import FloatingMenu from './FloatingMenu';
import { GetRoadmapById } from '../../../infrastructure/api/getroadmapbyid';
import Loader from '../UI/loader/Loading';

const nodeTypes = {
  custom: CustomNode,
};

export default function RoadmapFlowComponent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const roadmap = roadmaps[0];
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [ShowDetails, setShowDetails] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const { user } = useAuthStore();
  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [nodess, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getRoadmap = GetRoadmapById();
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getRoadmap.execute(slug);

        if (!response || !response.roadmap) {
          throw new Error('Roadmap not found');
        }

        const { roadmap } = response;
        setRoadmapData(roadmap);
        setNodes(roadmap.topics as unknown as Node[]);

        // Format edges properly
        const formattedEdges = (roadmap.edges || []).map((edge: any) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
          type: edge.type,
          animated: edge.animated,
        }));
        setEdges(formattedEdges);
      } catch (error) {
        console.error('Failed to fetch roadmap:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to load roadmap',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [slug]);
  const nodes = nodess.map((node) => {
    if (!node?.data) {
      console.error('Node data is missing:', node);
      return node;
    }
    const nodeData = { ...node.data };
    const completedNodes = user?.progress?.[roadmapData.id || ''] || [];

    // Check if this is a main topic and if all its subtopics are completed
    if (nodeData.type === 'topic') {
      const subtopics = nodess.filter(
        (n) =>
          n.data?.type === 'subtopic' &&
          n.data?.prerequisites?.includes(node.id),
      );

      if (subtopics.length > 0) {
        const allSubtopicsCompleted = subtopics.every((subtopic) =>
          completedNodes.includes(subtopic.id),
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
        completedNodes.includes(requiredId),
      );
    }

    return {
      ...node,
      data: {
        ...nodeData,
        onShowDetails: (nodeData: any) => {
          setShowDetails(true);
          setSelectedNode(nodeData);
        },
        onShowCourses: (nodeData: any) => {
          setSelectedNode(nodeData);
          setShowCourses(true);
        },
      },
    };
  });

  const completedNodes = user?.progress[roadmapData?.id || '']?.length || 0;
  const totalNodes = nodes.length;
  const progress = Math.round((completedNodes / totalNodes) * 100);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-slate-900">
          <div className="text-center p-8 rounded-lg shadow-lg bg-white dark:bg-gray-700">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Error
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-theme text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Top Bar */}
          <RoadmapTopBar
          setRoadmap = {setRoadmapData}
            roadmap={roadmapData}
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
            roadmap={roadmapData}
            userProgress={user?.progress[roadmapData?.id|| '']}
          />
        </div>
      )}
    </>
  );
}
