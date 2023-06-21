// require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OpenAI_Key
});
const openai = new OpenAIApi(configuration);

const AIFuncs = {
  async getTheme() {
    try {
      const themeChoice = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {"role": "system", "content": "You are a creative assistant."}, 
          {"role": "user", "content": "Give me a theme."}
        ],
        functions: [
          {
            name: "generateTheme",
            description: "Take a concept and output a playlist with related songs.",
            parameters: {
              type: "object",
              properties: {
                theme: {
                  type: "string",
                  description: "A concept."
                }
              },
              required: ["theme"]
            }
          }
        ],
        function_call: {"name": "generateTheme"},
        temperature: 2
      });
      const response = themeChoice.data.choices[0].message;
      console.log(response);
      const theme = await JSON.parse(response.function_call.arguments).theme;
      return theme;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },

  async getSongs(theme) {
    try {
      const playList = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {"role": "system", "content": "You are a clever music guru."}, 
          {"role": "user", "content": `Give me a list of songs with the theme ${theme}.`}
        ],
        functions: [
          {
            name: "generateThemePlaylist",
            description: "Create a playlist of songs related to a theme.",
            parameters: {
              type: "object",
              properties: {
                listOfSongs: {
                  type: "string",
                  description: "Five songs whose lyrics relate to a particular theme. Format: [song - artist, ...]"
                }
              },
              required: ["listOfSongs"]
            }
          }
        ],
        function_call: {"name": "generateThemePlaylist"}
      });
  
      const playlistResponse = playList.data.choices[0].message;
      const playlistParsed = JSON.parse(playlistResponse.function_call.arguments).listOfSongs;
      return playlistParsed;
  
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }  
}

// const test = AIFuncs.getTheme();

export { AIFuncs };

// async function chatConnect() {
//   try {
//     const themeChoice = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo-0613",
//       messages: [
//         {"role": "system", "content": "You are a clever music guru."}, 
//         {"role": "user", "content": "Make me a playlist."}
//       ],
//       functions: [
//         {
//           name: "generateTheme",
//           description: "Generate a random theme to make a playlist.",
//           parameters: {
//             type: "object",
//             properties: {
//               theme: {
//                 type: "string",
//                 description: "A random theme, unrelated to music. Examples: driving, time travel, mysteries."
//               }
//             },
//             required: ["theme"]
//           }
//         }
//       ],
//       function_call: {"name": "generateTheme"}
//     });
//     const response = themeChoice.data.choices[0].message;
//     const theme = JSON.parse(response.function_call.arguments).theme;
//     console.log(theme);

//     const playList = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo-0613",
//       messages: [
//         {"role": "system", "content": "You are a clever music guru."}, 
//         {"role": "user", "content": `Make me a playlist with the theme ${theme}.`}
//       ],
//       functions: [
//         {
//           name: "generateThemePlaylist",
//           description: "Create a playlist of songs related to a theme, with the theme as the title",
//           parameters: {
//             type: "object",
//             properties: {
//               listOfSongs: {
//                 type: "string",
//                 description: "A list of five songs whose lyrics relate to a particular theme."
//               }, 
//               title: {
//                 type: "string",
//                 description: "The theme that all the songs relate to which will be the title of the playlist."
//               }
//             },
//             required: ["listOfSongs", "title"]
//           }
//         }
//       ],
//       function_call: {"name": "generateThemePlaylist"}
//     });

//     const playlistResponse = playList.data.choices[0].message;
//     const playlistParsed = JSON.parse(playlistResponse.function_call.arguments).listOfSongs;
//     console.log(playlistResponse);
//     console.log(playlistParsed);

//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.status);
//       console.log(error.response.data);
//     } else {
//       console.log(error.message);
//     }
//   }
// }

// chatConnect();
