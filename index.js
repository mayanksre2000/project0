const { Telegraf } = require('telegraf');
const axios = require('axios');   // to make http calls
require('dotenv').config();   // to use or import .env file  
const bot = new Telegraf(process.env.BOT_TOKEN) ;

bot.start((ctx) => ctx.reply("welcome to hot bot,what do you wanna search?"));  //it is our bot's object instance which will say this when typed /start

// bot.command('xyz',async(ctx) => {
//     const response = await axios.get("http ff");   // use actual http something inside it to use it
//     ctx.reply(response.data);
// });

// bot.on('text',(ctx) => {
//     console.log(ctx);
//     if (ctx.update.message.text == 'how you doing!') 
//     { 
//         ctx.reply('hello cutie');
//     }
//     else {
//         ctx.reply("Cannot understand these puny humans language");
//     }  
// }
//     );

bot.on('sticker',(ctx) => ctx.reply("💕"));  // if someone sends you a sticker reply with a heart



// openai.apiKey = apiKey;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
bot.on('text', async (ctx) => {
  try{

    
    const inputText = ctx.update.message.text;
  
    const prompt = `Q: ${inputText}\nA:`;
    // const prompt = inputText;
    console.log("heyyyyy");
    console.log(prompt);
  
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "hi",
      // "max_tokens": 12 ,
      // "temperature": 0.4,
      // "openai_api_key" : "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", 
      // "openai_org_id ": "org-zyhcADFgxKQBYImUy1DKwV1q"
    },
    {
      timeout: 1000,
      headers: {
        "Example-Header": "example",
      }});

    const messageText = response.choices[0].text.trim();
    ctx.reply(messageText); 
  }
  catch (err) {
          console.error(err);
          ctx.reply('An error occurred while generating a response.');
        }

  });

bot.launch();