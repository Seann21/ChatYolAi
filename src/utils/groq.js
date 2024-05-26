import { Groq } from "groq-sdk";
let CHATYOL_API = import.meta.env.VITE_CHATYOL;

let groq = new Groq({
  apiKey: CHATYOL_API,
  dangerouslyAllowBrowser: true,
});

export let requestGroqAI = async (content) => {
  try {
    let reply = await groq.chat.completions.create({
      messages:
    [{ role: "user", content }],
      model: "llama3-8b-8192",
    });
    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error creating completion:", error);
    throw error;
  }
};
