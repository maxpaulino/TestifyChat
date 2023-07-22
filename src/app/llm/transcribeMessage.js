const fs = require('fs');
const openai = require("../../config/openai.js");


async function transcribeMessage(filename) {
    const resp = await openai.createTranscription(
        fs.createReadStream(filename), // Audio input file
        "whisper-1", // Whisper model name. 
        undefined, // Prompt
        'text', // Output format. Options are: json, text, srt, verbose_json, or vtt.
        1, // Temperature.
        'en' // ISO language code. Eg, for English `en`
    );

    if (resp.data.errors && resp.data.errors.length > 0) {
        // Handle error
        console.error(resp.data.errors);
        return null;
    }

    // Return the transcript
    return resp.data.transcript;
}

module.exports = transcribeMessage;
