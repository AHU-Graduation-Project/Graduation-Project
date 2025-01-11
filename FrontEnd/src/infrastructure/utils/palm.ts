import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);

interface GenerateOptions {
  minTopics: number;
  minSubtopics: number;
}

const EXAMPLE_STRUCTURE = `{
  "nodes": [
  {
    id: "1",
    type: "custom",
    position: { x: 400, y: 0 },
    data: {
      label: "HTML",
      type: "topic",
      description: "Learn the fundamentals of HTML markup language.",
      isSkill: true, // This is just if this is skill are Positionable in the cv
      isAnalysisNeeded: true, // This just if this topic are find a job with topic name
      isAchieved: true,
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
      isSkill: true,
      isAnalysisNeeded: true,
      isAchieved: false,
      requiredNodes: ["1"],
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
      isSkill: true,
      isAnalysisNeeded: true,
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
      isSkill: false,
      isAnalysisNeeded: false,
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
      isSkill: false,
      isAnalysisNeeded: false,
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
      isSkill: true,
      isAnalysisNeeded: true,
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
      isAchieved: false,
      isSkill: true,
      isAnalysisNeeded: true,
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
      isSkill: ture,
      isAnalysisNeeded: true,
      isAchieved: true,
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
      isAchieved: false,
      isSkill: false,
      isAnalysisNeeded: false,
      requiredNodes: ["8"],
    },
  },
],
  "edges": [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "left",
    targetHandle: "right",
    type: "smoothstep",
    style: { strokeDasharray: "5,5" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    sourceHandle: "right",
    targetHandle: "left",
    type: "smoothstep",
    style: { strokeDasharray: "5,5" },
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e3-7",
    source: "3",
    target: "7",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e6-8",
    source: "6",
    target: "8",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    sourceHandle: "bottom",
    targetHandle: "top",
    animated: true,
  },
]
}`;

const createSystemPrompt = (
  options: GenerateOptions
) => `You are a learning path generator. Generate a detailed roadmap in JSON format following these EXACT rules:

1. Node Structure:
   - All nodes must use type: "custom"
   - Main topics must be positioned at x: 400 with y incrementing by 100
   - Left subtopics must be at x: 100 (increased spacing)
   - Right subtopics must be at x: 700 (increased spacing)
   - Data object must include:
     * type: "topic" for main nodes, "subtopic" for side nodes
     * label: concise name
     * isSkill: This is just if this is skill are Positionable in the cv
     * isAnalysisNeeded: This just if this topic are find a job with topic name
     * description: detailed explanation


2. Edge Structure:
   For main flow (vertical connections):
   - id: "e{source}-{target}"
   - sourceHandle: "bottom"
   - targetHandle: "top"
   - animated: true
   
   For subtopics (side connections):
   - id: "e{source}-{target}"
   - sourceHandle: "left" or "right" depending on direction
   - targetHandle: "right" or "left" opposite of source
   - type: "smoothstep"
   - style: { strokeDasharray: "5,5" }

3. Layout Rules:
   - Main topics MUST flow vertically at x: 400
   - Subtopics MUST alternate between:
     * Left side at x: 100 (increased spacing)
     * Right side at x: 700 (increased spacing)
   - Y coordinates must increment by 100 for each level
   - Minimum ${options.minTopics} main topics
   - Maximum 50 nodes total
   - Minimum ${options.minSubtopics} subtopics per main topic
   - Ensure logical topic progression

4. Connection Rules:
   - Main topics connect vertically (bottom to top)
   - Subtopics connect horizontally (left/right)
   - Each subtopic must connect to its parent topic
   - Multiple nodes can connect to the same target

5. Sources and References:
   - Include a "sources" array in the response containing:
     * title: name of the resource
     * url: link to the resource
     * type: "documentation" | "course" | "article" | "book"
     * description: brief description of what this resource covers


Ensure all information provided is backed by reputable sources and include them in the response.`;

export async function generateRoadmap(
  prompt: string,
  options: GenerateOptions = { minTopics: 15, minSubtopics: 2 },
  signal?: AbortSignal
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      [
        createSystemPrompt(options),
        EXAMPLE_STRUCTURE,
        `Generate a learning roadmap for: ${prompt}. Follow the example structure exactly and provide a complete roadmap for the requested topic, ensuring proper node positioning and connections. Include at least ${options.minTopics} main topics and ${options.minSubtopics} subtopics per main topic. Make sure to include relevant sources and references. ensure the user propmt about IT fileds or related other then this dont send anything
`,
      ],
      { signal }
    );

    const response = await result.response;
    const text = response.text();

    // Extract JSON content

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Invalid AI response format - no JSON structure found");
    }
    try {
      const parsedData = JSON.parse(match[0]);

      // Validate response structure
      if (!parsedData.nodes || !Array.isArray(parsedData.nodes)) {
        throw new Error(
          "Invalid roadmap data - nodes array is missing or invalid"
        );
      }
      if (!parsedData.edges || !Array.isArray(parsedData.edges)) {
        throw new Error(
          "Invalid roadmap data - edges array is missing or invalid"
        );
      }

      // Extract sources if present
      if (parsedData.sources) {
        try {
          const sourcesJson = parsedData.sources;
          if (!Array.isArray(sourcesJson)) {
            console.warn("Invalid sources array - expected an array");
          }
        } catch (e) {
          console.warn("Error parsing sources:", e);
          parsedData.sources = [];
        }
      }

      return parsedData;
    } catch (parseError) {
      const errorMessage =
        parseError instanceof Error
          ? parseError.message
          : "Unknown error occurred";
      throw new Error("Failed to parse AI response: " + errorMessage);
    }
  } catch (error) {
    if (signal?.aborted) {
      const abortError = new Error("Generation was stopped by user");
      abortError.name = "AbortError";
      throw abortError;
    }
    throw error;
  }
}
