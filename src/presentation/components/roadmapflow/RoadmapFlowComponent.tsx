import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edge, Node } from 'reactflow';
import RoadmapTopBar from './RoadmapTopBar';
import { CustomNode } from './CustomNode';
import ModalsAndPanels from './ModalsAndPanels';
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
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [ShowDetails, setShowDetails] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [nodess, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRoadmap = GetRoadmapById();

  const updateNodeProgress = useCallback(
    (nodeId: string, isComplete: boolean) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) => {
          // Update the specific node's achieved status
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                isAchieved: isComplete,
              },
            };
          }

          // Recalculate shouldBeActive for all nodes
          const nodePrerequisites = node.data.prerequisites || [];
          const completedNodeIds = currentNodes
            .filter((n) => n.data.isAchieved)
            .map((n) => n.id);

          const shouldBeActive =
            nodePrerequisites.length === 0 ||
            nodePrerequisites.some((prereqId) =>
              completedNodeIds.includes(prereqId),
            );

          return {
            ...node,
            data: {
              ...node.data,
              shouldBeActive,
            },
          };
        }),
      );

      // Update completedNodeIds
      setCompletedNodeIds((current) =>
        isComplete
          ? [...new Set([...current, nodeId])]
          : current.filter((id) => id !== nodeId),
      );
    },
    [],
  );

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

        // Initialize nodes with progress tracking
        const initialNodes = (roadmap.topics as unknown as Node[]).map(
          (node) => ({
            ...node,
            data: {
              ...node.data,
              updateNodeProgress,
              onShowDetails: (nodeData: any) => {
                setShowDetails(true);
                setSelectedNode(nodeData);
              },
              onShowCourses: (nodeData: any) => {
                setSelectedNode(nodeData);
                setShowCourses(true);
              },
            },
          }),
        );

        setNodes(initialNodes);

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

        // Initialize completed nodes
        const initialCompletedNodes = initialNodes
          .filter((node) => node.data.isAchieved)
          .map((node) => node.id);
        setCompletedNodeIds(initialCompletedNodes);
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
  }, [slug, updateNodeProgress]);

  const nodes = nodess.map((node) => {
    if (!node?.data) {
      console.error('Node data is missing:', node);
      return node;
    }

    const nodeData = { ...node.data };
    const shouldBeActive =
      nodeData.prerequisites?.some((prerequisiteId: string) =>
        completedNodeIds.includes(prerequisiteId),
      ) ||
      nodeData.isAchieved ||
      nodeData.prerequisites?.length === 0;

    return {
      ...node,
      data: {
        ...nodeData,
        shouldBeActive,
      },
    };
  });
  const handleFollowRoadmap = (isFollowed: boolean) => {
    if (roadmapData) {
      setRoadmapData((prev) => ({ ...prev, isFollowed }));
    }
  };
  const completedNodes = roadmapData?.completedNodes?.length || 0;
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
            setRoadmap={setRoadmapData}
            roadmap={roadmapData}
            completedNodes={completedNodeIds.length}
            totalNodes={nodes.length}
            onFollowChange={handleFollowRoadmap}
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
            userProgress={roadmapData?.completedNodes}
            onFollowChange={handleFollowRoadmap}
          />
        </div>
      )}
    </>
  );
}
