import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);
export function StreamingResponse() {
  const [isStreaming, setIsStreaming] = useState(false);

  const streamResponse = useCallback(async (
    prompt: string,
    onToken: (token: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
  ) => {
    setIsStreaming(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        onToken(text);
      }

      onComplete();
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return {
    isStreaming,
    streamResponse
  };
}