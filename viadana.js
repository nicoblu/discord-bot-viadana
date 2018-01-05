//envs yay
require('dotenv').config();

// here be bots
const Discord = require('discord.js');
const viadana = new Discord.Client();

viadana.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', message => {
    if (message.content === '!ping') {
        message.reply('no u');
    }
});

client.login(process.env.DISCORD_TOKEN);