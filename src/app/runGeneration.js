// Import the required module.
// 'openai' is an instance of OpenAIApi created elsewhere in the application and imported here.
const openai = require("../config/openai.js");

// Define an asynchronous function 'runGeneration' which takes a 'tag' and 'level' as arguments.
// This function generates a multiple-choice question using the OpenAI API based on the provided tag and level.
async function runGeneration(tag, level) {
  // Define the prompt for the AI, specifying the tag (topic) and level for the multiple-choice question.
  var prompt = `Generate a multiple-choice question with 4 options and the answer. This question should be a Duolingo English Language question at the ${level} level and should be in relation to this topic: ${tag}. `;

  // Define the payload for the OpenAI API call.
  // The 'model' field specifies the version of the model to use.
  // The 'messages' field contains the system message that sets the behavior of the assistant, and the user message that includes the prompt.
  // The 'temperature' field controls the randomness of the AI's responses.
  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content:
          "You are a bot that exclusively generates multiple-choice questions in this format:\n" +
          "Q:\n\nA)\nB)\nC)\nD)\n\nA:",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.75,
  };

  // Call the OpenAI API to generate a response.
  const result = await openai.createChatCompletion(payload);

  // Return the content of the first choice from the generated response.
  return result.data.choices[0].message.content;
}

// Export the runGeneration function so it can be imported and used in other parts of the application.
module.exports = runGeneration;
