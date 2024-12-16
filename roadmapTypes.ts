interface IRoadMap {
  id: string | number;
  title: string;
  description: string;
  slug: string;
  isOfficial: boolean;
  creatorId: string | number;
  visibility: "public" | "private" | "hidden";
  topicCount: number;
  keywords: string[];
  nodes: ITopic[];
  edges: IEdge[];
  feedbacks: IFeedback[];
  createdAt: Date,
  updatedAt: Date,
  creator: {
    id: string,
    name: string,
  },
}
interface ITopic {
  id: string | number;
  type: string;
  position: IPosition;
  // the below key retrieved for the user.
  achieved: boolean;
  label: string;
  zIndex: number;
  width: number;
  height: number;
  positionAbsolute: number;
}
interface IEdge {
  id: string;
  source: string | number; // topicId
  // define the connecting point in the topic (top | right | bottom | left)
  sourceHandle: string;
  target: string | number; // topicId
  targetHandle: string;
  edgeStyle: string;
}
interface IFeedback {
  isUser: boolean;
  name: string;
  feedback: string;
  position: string;
  Level: string;
}
interface IPosition {
  x: number;
  y: number;
}
const exampleRoadmap = {
  id: "675c977eecc889bb0d7e646c",
  title: "FrontEnd Basics",
  description:
    "A Simple roadmap that help you start learning frontend development",
  slug: "frontend-basic",
  isOfficial: true,
  creatorId: "64a61780ec22530247f12c82",
  visibility: "public",
  topicCount: 9,
  keywords: ["frontend", "web", "react", "angular"],
  nodes: [
    {
      id: "HAJWL53ZIhw8DpowyLd11",
      type: "topic",
      position: {
        x: -379.605049739359,
        y: -190.66033153952597,
      },
      achieved: false,
      label: "HTML",
      zIndex: 999,
      width: 91,
      height: 48,
      positionAbsolute: {
        x: -379.605049739359,
        y: -190.66033153952597,
      },
    },
    {
      id: "ieRYzRm_-8-8nP_BA0FnY",
      type: "topic",
      position: {
        x: -372.105049739359,
        y: -39.399411772945726,
      },
      achieved: false,
      label: "CSS",
      zIndex: 999,
      width: 77,
      height: 48,
      positionAbsolute: {
        x: -372.105049739359,
        y: -39.399411772945726,
      },
    },
    {
      id: "r05nWM_DGF4c1CZJMkygT",
      type: "topic",
      position: {
        x: -396.105049739359,
        y: 91.69338535809047,
      },
      achieved: false,
      label: "JavaScript",
      zIndex: 999,
      width: 124,
      height: 48,
      positionAbsolute: {
        x: -396.105049739359,
        y: 91.69338535809047,
      },
    },
    {
      id: "yYrGhcgfbW71Nr8sd-DPY",
      type: "subtopic",
      position: {
        x: -589.605049739359,
        y: 91.69338535809047,
      },
      achieved: false,
      label: "JS Syntax",
      zIndex: 999,
      width: 118,
      height: 48,
      positionAbsolute: {
        x: -589.605049739359,
        y: 91.69338535809047,
      },
    },
    {
      id: "BH9tDKbtpjpcGutQyOFnz",
      type: "subtopic",
      position: {
        x: -184.605049739359,
        y: 91.69338535809047,
      },
      achieved: false,
      label: "DOM",
      zIndex: 999,
      width: 84,
      height: 48,
      positionAbsolute: {
        x: -184.605049739359,
        y: 91.69338535809047,
      },
    },
    {
      id: "P_vn7q-MDcuvWqlDvE1nN",
      type: "topic",
      position: {
        x: -470.605049739359,
        y: 224.22676267737972,
      },
      achieved: false,
      label: "React",
      zIndex: 999,
      width: 90,
      height: 48,
    },
    {
      id: "16fGj4TOYaFrPImOOEU-B",
      type: "topic",
      position: {
        x: -287.605049739359,
        y: 224.22676267737972,
      },
      achieved: false,
      label: "Angular",
      zIndex: 999,
      width: 103,
      height: 48,
      positionAbsolute: {
        x: -287.605049739359,
        y: 224.22676267737972,
      },
    },
    {
      id: "F4zL-8Wwx-Fkg7M0bPQeB",
      type: "topic",
      position: {
        x: -372.105049739359,
        y: 335.33681463925166,
      },
      achieved: false,
      label: "VCS",
      zIndex: 999,
      width: 76,
      height: 48,
      positionAbsolute: {
        x: -372.105049739359,
        y: 335.33681463925166,
      },
    },
    {
      id: "qEcrOq5wzQXzf8vsBJPmE",
      type: "topic",
      position: {
        x: -403.605049739359,
        y: 470.87734086969925,
      },
      achieved: false,
      label: "SSR Vs CSR",
      zIndex: 999,
      width: 139,
      height: 48,
      positionAbsolute: {
        x: -403.605049739359,
        y: 470.87734086969925,
      },
    },
  ],
  edges: [
    {
      source: "HAJWL53ZIhw8DpowyLd11",
      sourceHandle: "x2",
      target: "ieRYzRm_-8-8nP_BA0FnY",
      targetHandle: "w1",
      edgeStyle: "solid",
      id: "reactflow__edge-HAJWL53ZIhw8DpowyLd11x2-ieRYzRm_-8-8nP_BA0FnYw1",
    },
    {
      source: "ieRYzRm_-8-8nP_BA0FnY",
      sourceHandle: "x2",
      target: "r05nWM_DGF4c1CZJMkygT",
      targetHandle: "w1",
      edgeStyle: "solid",
      id: "reactflow__edge-ieRYzRm_-8-8nP_BA0FnYx2-r05nWM_DGF4c1CZJMkygTw1",
    },
    {
      source: "r05nWM_DGF4c1CZJMkygT",
      sourceHandle: "y2",
      target: "yYrGhcgfbW71Nr8sd-DPY",
      targetHandle: "z2",
      edgeStyle: "dashed",
      id: "reactflow__edge-r05nWM_DGF4c1CZJMkygTy2-yYrGhcgfbW71Nr8sd-DPYz2",
    },
    {
      source: "r05nWM_DGF4c1CZJMkygT",
      sourceHandle: "z2",
      target: "BH9tDKbtpjpcGutQyOFnz",
      targetHandle: "y2",
      edgeStyle: "dashed",
      id: "reactflow__edge-r05nWM_DGF4c1CZJMkygTz2-BH9tDKbtpjpcGutQyOFnzy2",
    },
    {
      source: "r05nWM_DGF4c1CZJMkygT",
      sourceHandle: "x2",
      target: "P_vn7q-MDcuvWqlDvE1nN",
      targetHandle: "w1",
      edgeStyle: "solid",
      id: "reactflow__edge-r05nWM_DGF4c1CZJMkygTx2-P_vn7q-MDcuvWqlDvE1nNw1",
    },
    {
      source: "r05nWM_DGF4c1CZJMkygT",
      sourceHandle: "x2",
      target: "16fGj4TOYaFrPImOOEU-B",
      targetHandle: "w2",
      edgeStyle: "solid",
      id: "reactflow__edge-r05nWM_DGF4c1CZJMkygTx2-16fGj4TOYaFrPImOOEU-Bw2",
    },
    {
      source: "16fGj4TOYaFrPImOOEU-B",
      sourceHandle: "x2",
      target: "F4zL-8Wwx-Fkg7M0bPQeB",
      targetHandle: "w1",
      edgeStyle: "solid",
      id: "reactflow__edge-16fGj4TOYaFrPImOOEU-Bx2-F4zL-8Wwx-Fkg7M0bPQeBw1",
    },
    {
      source: "P_vn7q-MDcuvWqlDvE1nN",
      sourceHandle: "x2",
      target: "F4zL-8Wwx-Fkg7M0bPQeB",
      targetHandle: "w2",
      edgeStyle: "solid",
      id: "reactflow__edge-P_vn7q-MDcuvWqlDvE1nNx2-F4zL-8Wwx-Fkg7M0bPQeBw2",
    },
    {
      source: "F4zL-8Wwx-Fkg7M0bPQeB",
      sourceHandle: "x2",
      target: "qEcrOq5wzQXzf8vsBJPmE",
      targetHandle: "w2",
      edgeStyle: "solid",
      id: "reactflow__edge-F4zL-8Wwx-Fkg7M0bPQeBx2-qEcrOq5wzQXzf8vsBJPmEw2",
    },
  ],
  feedbacks: [
    {
      isUser: false,
      name: "Ahmad Nairat",
      feedback: "amazing roadmap.",
      position: "FrontEnd Developer",
      Level: "Associate",
    },
  ],
  createdAt: "2024-12-13T20:22:22.234Z",
  updatedAt: "2024-12-16T20:30:36.655Z",
  creator: {
    id: "64a61780ec22530247f12c82",
    name: "Ahmad Nairat",
  },
};
