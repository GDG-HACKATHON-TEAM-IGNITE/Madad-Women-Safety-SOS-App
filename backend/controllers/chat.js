// import mongoose from "mongoose";
// import Message from "../models/message.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

//fetching response from gemini
const genAi = new GoogleGenerativeAI(process.env.API_key);
const model = genAi.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const fetchmessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Sending to Gemini:", message); // Debugging line
    if (!message) {
      return res.status(400).json({
        error: "message is required .",
      });
    }
    const result = await model.generateContent(message);
    const reply = result.response.text;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini Api error . ", err);
    if (err.status === 429) {
      return res.status(429).json({
        error: "too many request.",
      });
    }
    res.status(500).json({ error: "something went wrong" });
  }
};

export default fetchmessage;
