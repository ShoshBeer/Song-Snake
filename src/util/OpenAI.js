const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OpenAI_Key
});
const openai = new OpenAIApi(configuration);

async function generateSongList(theme) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: theme}],
  });
  console.log(completion.data.choices[0].message);

}

generateSongList("chicken");