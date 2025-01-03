// chatUtils.js
import { pipeline } from "@huggingface/transformers";

// Initialize Hugging Face embedding model
let embeddingModel;
const initializeEmbeddingModel = async () => {
  if (!embeddingModel) {
    embeddingModel = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );
    console.log("Embedding model initialized");
  }
};

export const cosineSimilarity = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError("Both arguments for cosineSimilarity must be arrays.");
  }

  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export const extractEmbedding = (embeddingNested) => {
  if (Array.isArray(embeddingNested)) {
    if (Array.isArray(embeddingNested[0])) {
      if (Array.isArray(embeddingNested[0][0])) {
        return embeddingNested[0][0]; // Deeply nested
      }
      return embeddingNested[0]; // Nested
    }
    return embeddingNested; // Flat array
  }
  throw new TypeError("Unexpected embedding format.");
};

export const createChunks = async (text) => {
  await initializeEmbeddingModel();
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];

  for (let i = 0; i < sentences.length; i += 3) {
    const chunkText = sentences.slice(i, i + 3).join(" ");
    const embeddingNested = await embeddingModel(chunkText);
    const embedding = extractEmbedding(embeddingNested);
    chunks.push({ content: chunkText, embedding });
  }

  return chunks;
};

export const findRelevantChunk = async (query, chunks) => {
  await initializeEmbeddingModel();
  const queryEmbeddingNested = await embeddingModel(query);
  const queryEmbedding = extractEmbedding(queryEmbeddingNested);

  let bestScore = -Infinity;
  let bestChunk = chunks[0];

  for (const chunk of chunks) {
    const score = cosineSimilarity(queryEmbedding, chunk.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestChunk = chunk;
    }
  }

  return bestChunk.content;
};
