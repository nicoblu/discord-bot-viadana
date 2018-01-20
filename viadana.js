//envs yay
require('dotenv').config();

// here be bots
const Discord = require('discord.js');
const viadana = new Discord.Client({autoReconnect:true});

const axios = require('axios');
const fs = require('fs');
const convertDegrees = require('./convertDegrees.js')

//storage of zips for weather lookup
let rawData = fs.readFileSync('./zips.json');
let zipCodes = JSON.parse(rawData);

const manualWrite = () => {
    let addZips = JSON.stringify(zipCodes, null, 2);
    fs.writeFileSync('zips.json', addZips);
    console.log('added new items to file')  
}

viadana.on('ready', () => {
    console.log(`Logged in as ${viadana.user.tag}!`);
});

//write JSON file once every 24 Hours
setInterval( () => {
    manualWrite();
}, 86400000);

viadana.on('message', message => {
    //moved to avoid bot conflicts
    if (message.author.bot) return;

    let content = message.content.split(' ');
    let command = content[0].toLowerCase();
    let user = message.member.user.id;
    let re = /infowars/

    //puts embedded message for infowars.com when infowars is mentioned in chat
    if (message.content.search(re) > -1) {
        message.channel.send({embed: {
            color: 0xCC99FF,
            author: {
                name: 'Alex Jones'
            },
            title: 'infowars.com',
            url: 'https://www.infowars.com',
            thumbnail: {
                url: 'https://i.imgur.com/E4gyU69.png'
            },
            description: 'Stopping the **Illuminati** from turning the freaking frogs gay.'
            }
        });
    }

    //allows users to set their zipcodes for weather lookup
    if (command === '.setwea') {
        if (content[1] === undefined) {
        	message.channel.send('use `.setwea ZIPCODE` to set your location')
        } else {
        	zipCodes[user] = content[1]
      		message.reply(`Zip Code set to ${zipCodes[user]}`)
        }
    }

    //allows user to check what their zip is set to
    if (command === '.checkzip') {
    	if (zipCodes[user] === undefined) {
    		message.channel.send('use `.setwea ZIPCODE` to set your location')
    	} else {
    		message.reply(`Your Zip Code is set to ${zipCodes[user]}`)
    	}
    }

    //manual command to write zips to file
    if (command === '.write'){
        //allows only the owner to do this
        if (user === `${process.env.BOT_OWNER}`){
            manualWrite();            
            message.channel.send('File written');
        } else {
            message.channel.send('No. Go away.')
        }
    }

    //use openweathermap to check weather at user set zip
    if (command === '.wea') {
    	let weatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCodes[message.member.user.id]}&units=imperial&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    	axios.get(weatherURL).then( (weatherData) => {
    		message.channel.send(`Currently in ${weatherData.data.name}: ${Math.round(parseFloat(weatherData.data.main.temp))}°F // ${weatherData.data.weather[0].description} // Winds: ${Math.round(Number(weatherData.data.wind.speed))}mph ${convertDegrees(Number(weatherData.data.wind.deg))}`)
    	}).catch( (error) => {
	    	if (zipCodes[user] === undefined) {
	    		message.channel.send('use `.setwea ZIPCODE` to set your location')
	    	} else {
    			message.channel.send('shit done broke. i blame you.')
	    	}

    	})
    }

    //for midge
    if (command === '.boobies') {
        message.channel.send('pls show bobs and vagene bby',{tts:true})
    }

    //an attempt to use a quick web search, but duckduckgo has a pretty empty api
    if (command === '.goduckyourself'){
        let searchPhrase = content.splice(1).join(' ');
        axios.get(`https://api.duckduckgo.com/?q=${searchPhrase}&format=json&t=viadanadiscordbot`).then( results => {
            if (results.data.AbstractURL !== '') {
                message.channel.send(results.data.AbstractURL)
            } else {
                message.channel.send("Can't find `" + `${searchPhrase}` + '` ' + "because DuckDuckGo's API sucks.")
            }

        })

    }

    //because this is still more useful than DuckDuckGo's API. basic let me google that for you search with an embedded link return
    if (command === '.lmgtfy'){
        let query = content.slice(1).join('+');
        message.channel.send({embed: {
            color: 0x4885ED,
            author: {
                name: 'Google'
            },
            title: `${content.slice(1).join(' ')} search`,
            url: `https://www.google.com/search?q=${query}`,
            thumbnail: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/150px-Google-favicon-2015.png'
            },
            description: "Because you're too lazy to search for yourself."
        }
    });
    }

    //youtube version of prior command
    if (command === '.lmyttfy'){
        let query = content.slice(1).join('+');
        message.channel.send({embed: {
            color: 0xDB3236,
            author: {
                name: 'YouTube'
                },
            title: `${content.slice(1).join(' ')} search`,
            url: `https://www.youtube.com/results?search_query=${query}`,
            thumbnail: {
                url: 'https://logoeps.com/wp-content/uploads/2015/07/youtube-logo-full-color.png'
            },
            description: "Because you're too lazy to search yourself"
            }
        });
    }

});

viadana.login(process.env.DISCORD_TOKEN);