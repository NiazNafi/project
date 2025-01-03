// chat.js
import express from "express";
import { ChatGroq } from "@langchain/groq";
import { createChunks, findRelevantChunk } from "../utils/chatUtils.js";

const router = express.Router();

// Initialize ChatGroq
const chatModel = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0,
  apiKey: "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",
});

router.post("/", async (req, res) => {
  const { userQuery, courseChapterText } = req.body;
  console.log("User Query:", userQuery);

  if (!userQuery || !courseChapterText) {
    return res
      .status(400)
      .json({ error: "userQuery and courseChapterText are required" });
  }

  try {
    // Create chunks from the course chapter text
    const textChunks = await createChunks(courseChapterText);
    console.log("Text Chunks created:", textChunks.length);

    // Find the most relevant chunk based on user query
    const relevantContext = await findRelevantChunk(userQuery, textChunks);
    console.log("Found relevant context");

    // Build the conversation history
    const conversationHistory = [
      { role: "system", content: "You are a helpful learning bot 'Edubot'." },
      { role: "system", content: `Context: ${relevantContext}` },
      { role: "user", content: userQuery },
    ];

    // Generate AI response
    const aiResponse = await chatModel.invoke(conversationHistory);
    console.log("AI Response generated");

    res.json({ response: aiResponse.text });
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({
      error: "Failed to process the query.",
      message: error.message,
    });
  }
});

export default router;
