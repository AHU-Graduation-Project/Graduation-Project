import { Node, Edge } from 'reactflow';

interface NodeWithLevel {
  node: Node;
  level: number;
  position: 'left' | 'right' | 'center';
  parentId?: string;
}

const VERTICAL_SPACING = 200;
const HORIZONTAL_SPACING = 350;
const BRANCH_OFFSET = 400;

export function calculateHierarchicalLayout(nodes: Node[], edges: Edge[]) {
  // Create connection maps
  const childrenMap = new Map<string, string[]>();
  const parentMap = new Map<string, string[]>();
  
  edges.forEach(edge => {
    if (!childrenMap.has(edge.source)) {
      childrenMap.set(edge.source, []);
    }
    childrenMap.get(edge.source)!.push(edge.target);
    
    if (!parentMap.has(edge.target)) {
      parentMap.set(edge.target, []);
    }
    parentMap.get(edge.target)!.push(edge.source);
  });

  // Find root nodes (nodes with no parents)
  const rootNodes = nodes.filter(node => !parentMap.has(node.id));
  
  // Process nodes to assign levels and positions
  const nodesWithLevels: NodeWithLevel[] = [];
  const processedNodes = new Set<string>();

  function processNode(
    node: Node, 
    level: number, 
    position: 'left' | 'right' | 'center',
    parentId?: string
  ) {
    if (processedNodes.has(node.id)) return;
    processedNodes.add(node.id);

    nodesWithLevels.push({ node, level, position, parentId });

    const children = childrenMap.get(node.id) || [];
    let leftIndex = 0;
    let rightIndex = 0;

    children.forEach((childId, index) => {
      const childNode = nodes.find(n => n.id === childId);
      if (!childNode) return;

      // Alternate between left and right for children
      const childPosition = index % 2 === 0 ? 'left' : 'right';
      const childLevel = level + 1;

      if (childPosition === 'left') {
        leftIndex++;
        processNode(childNode, childLevel, childPosition, node.id);
      } else {
        rightIndex++;
        processNode(childNode, childLevel, childPosition, node.id);
      }
    });
  }

  // Process all root nodes
  rootNodes.forEach(rootNode => {
    processNode(rootNode, 0, 'center');
  });

  // Calculate final positions
  return nodes.map(node => {
    const nodeInfo = nodesWithLevels.find(n => n.node.id === node.id);
    if (!nodeInfo) return node;

    const { level, position, parentId } = nodeInfo;
    let xPosition = 0;
    
    if (position === 'center') {
      xPosition = 0;
    } else {
      const parentNode = nodesWithLevels.find(n => n.node.id === parentId);
      const parentX = parentNode ? (parentNode.position === 'center' ? 0 : BRANCH_OFFSET * (parentNode.position === 'left' ? -1 : 1)) : 0;
      
      if (position === 'left') {
        xPosition = parentX - HORIZONTAL_SPACING;
      } else {
        xPosition = parentX + HORIZONTAL_SPACING;
      }
    }

    return {
      ...node,
      position: {
        x: xPosition,
        y: level * VERTICAL_SPACING
      },
      data: {
        ...node.data,
        position
      }
    };
  });
}

export function createHierarchicalEdges(edges: Edge[]): Edge[] {
  return edges.map(edge => ({
    ...edge,
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: 'url(#edge-gradient)',
      strokeWidth: 2,
    }
  }));
}

export function generateNodeId(): string {
  return Math.random().toString(36).substr(2, 9);
}