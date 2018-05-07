const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NDQzMTMxMzIzNjM3MzAxMjU4.DdI5ug.PYoqQpdyYw-99RQ3qIUPjnhC_IY');

var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = '193.70.80.37'; // Your MC server IP
var mcPort = 25659; // Your MC server port

client.on('message', message => {
    if (message.content === mcCommand) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '*Minecraft server is currently offline*';
            if(body.online) {
                status = '**Minecraft** server is **online**  -  ';
                if(body.players.now) {
                    status += '**' + body.players.now + '** people are playing!';
                } else {
                    status += '*Nobody is playing!*';
                }
            }
            message.reply(status);
        });
    }
});
