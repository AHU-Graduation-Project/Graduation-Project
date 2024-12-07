import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

const systemPrompt = `You are an expert in creating comprehensive learning roadmaps. Generate a detailed roadmap in the following JSON format:

{
  "nodes": [
    {
      "id": string,
      "type": "custom",
      "data": {
        "label": string,
        "description": string,
        "marketDemand": string,
        "averageSalary": string,
        "requiredSkills": string[]
      },
      "position": { "x": number, "y": number }
    }
  ],
  "edges": [
    {
      "id": string,
      "source": string,
      "target": string,
      "animated": boolean
    }
  ]
}

Rules for Generation:
1. **Comprehensive Coverage**:
   - Each node must represent a **single specific milestone or topic**.
   - Subtopics within a milestone (e.g., "Linear Algebra," "Calculus," and "Statistics" for "Mathematics Fundamentals") must have their own nodes, connected as subnodes to their parent node.

2. **Node Placement**:
   - Parent nodes should be spaced vertically with at least 200 units difference in the \`y\` position (e.g., y = 100, y = 300).
   - Subnodes must be placed either to the left (x = parent.x - 300) or to the right (x = parent.x + 300) of their parent node with the same \`y\` value as the parent node.
   - Ensure subnodes are neatly aligned and spaced equally around their parent node.

3. **Edge Connections**:
   - Connect subnodes logically to their parent milestone using edges.
   - Include animated connections for all edges.

4. **Detailed Content**:
   - For each node, provide realistic insights, such as market demand and average salary ranges.
   - Include 3-5 specific skills aligned with the node's focus.

5. **Node Structure**:
   - IDs must be sequential numbers as strings (e.g., "1", "2").
   - Use "type": "custom" for all nodes.

6. **Number of Milestones**:
   - Cover at least 15 primary nodes, each with relevant subnodes for a detailed roadmap.

7. **Output Precision**:
   - Do not merge multiple topics into one node's description.
   - Output JSON format only. Do not include any explanation or comments outside the JSON.

`;

export async function generateRoadmap(prompt: string) {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-405b-instruct:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 30000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content received from OpenAI');
console.log(content);



    try {
      const parsedMatch=  content.match(/{[\s\S]*}/);
      const parsedContent = JSON.parse(parsedMatch[0]);
      
      // Validate the response structure
      if (!parsedContent.nodes || !parsedContent.edges) {
        throw new Error('Invalid roadmap data structure');
      }

      // Ensure all nodes have the required properties
      parsedContent.nodes = parsedContent.nodes.map(node => ({
        ...node,
        type: 'custom',
        data: {
          ...node.data,
          onShowDetails: () => {}, // Will be overridden by the component
          t: () => {} // Will be overridden by the component
        }
      }));

      return parsedContent;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse the generated roadmap data');
    }
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenAI API configuration.');
    }
    throw new Error(error.message || 'Failed to generate roadmap');
  }
}