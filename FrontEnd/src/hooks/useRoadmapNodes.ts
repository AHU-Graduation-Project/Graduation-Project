import { useMemo } from 'react';
import { Node, Edge } from 'reactflow';

interface NodeData {
  label: string;
  description: string;
  marketDemand: string;
  averageSalary: string;
  requiredSkills: string[];
  isUnlocked?: boolean;
}

export function useRoadmapNodes(
  nodes: Node<NodeData>[],
  edges: Edge[],
  completedNodeIds: string[]
) {
  return useMemo(() => {
    // Create a map of node connections
    const nodeConnections = edges.reduce((acc, edge) => {
      if (!acc[edge.target]) {
        acc[edge.target] = [];
      }
      acc[edge.target].push(edge.source);
      return acc;
    }, {} as Record<string, string[]>);

    // Process nodes to determine which should be unlocked
    return nodes.map(node => {
      const nodeId = node.id;
      const isFirstNode = !nodeConnections[nodeId]; // Nodes with no incoming edges are starting nodes
      const incomingNodes = nodeConnections[nodeId] || [];
      
      // A node is unlocked if:
      // 1. It's a starting node (no prerequisites), or
      // 2. All its prerequisite nodes are completed
      const isUnlocked = isFirstNode || 
        (incomingNodes.length > 0 && incomingNodes.every(id => completedNodeIds.includes(id)));

      return {
        ...node,
        data: {
          ...node.data,
          isUnlocked,
        },
      };
    });
  }, [nodes, edges, completedNodeIds]);
}