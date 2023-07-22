// Import the required modules.
// 'whatsapp' is a configured instance of the 'whatsapp-web.js' Client.
// 'function_schemas' is a collection of function schemas used to create custom behavior in chat models.
// 'runResponse' is a function used to get a response from the OpenAI API.
// 'dotenv' is a zero-dependency module that loads environment variables from a .env file into process.env.
const whatsapp = require("../config/whatsapp.js");
const runResponse = require("./llm/runResponse.js");
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const transcribeMessage = require('./llm/transcribeMessage.js');
require("dotenv").config();

// Get the phone number from the environment variables.
const phoneNumber = process.env.PHONE_NUMBER;

// Directory to save audio files
const audioDir = './audioMessages/';

// Listen for messages from WhatsApp.
whatsapp.on("message", async (message) => {
  // Log the content of the received message.
  console.log(message.body);
  console.log(message.from);

  // If the message is from the phone number in the environment variables
  if (message.from === phoneNumber) {

    // Check if the message is a voice message
    if (message.hasMedia) {
      console.log("This is a voice message!")

      // Get the media
      const media = await message.downloadMedia();

      // Create a filename using current timestamp
      const filename = `${audioDir}audio_${Date.now()}.${media.mimetype.split('/')[1]}`;

      // Save the media to the audio directory
      fs.writeFileSync(filename, media.data, 'base64');

      // Check if it is a .ogg file
      if (media.mimetype.includes('ogg')) {
          const outputFileName = filename.replace('ogg', 'mp3');
          ffmpeg(filename)
              .toFormat('mp3')
              .on('error', (err) => {
                  console.log('An error occurred: ' + err.message);
              })
              .on('progress', (progress) => {
                  console.log('Processing: ' + progress.targetSize + ' KB converted');
              })
              .on('end', () => {
                  console.log('Processing finished !');
                  // Proceed with transcription
                  proceedWithTranscription(outputFileName);
              })
              .save(outputFileName); //path where you want to save your file
      } else {
          // If not ogg, proceed with transcription
          proceedWithTranscription(filename);
      }
    } else {
      console.log("This is a text message!")
      // For non-voice messages, continue with the regular runResponse.
      runResponse(message.body).then((response) => message.reply(response));
    }
  }

  async function proceedWithTranscription(filename) {
      // Transcribe the message
      const transcription = await transcribeMessage(filename);

      console.log(transcription);

      // Then, handle the transcribed text and reply with the response.
      runResponse(transcription).then((response) => message.reply(response));
  }
});

