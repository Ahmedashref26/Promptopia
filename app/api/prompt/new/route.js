import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const body = await req.json();
  const { prompt, tag, userId } = body;
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
