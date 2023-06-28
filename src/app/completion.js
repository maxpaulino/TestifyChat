openai = require("./src/config/openai");

async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 200,
  });
  return completion.data.choices[0].text;
}
