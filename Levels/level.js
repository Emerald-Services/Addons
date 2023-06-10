const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { Command } = require('../Structures/Addon');

// Load config
const config = require('./Configs/leveling.json');

// Load data from JSON file
const dataPath = path.join(__dirname, './Data/leveling.json');
let data = JSON.parse(fs.readFileSync(dataPath));

module.exports.commands = [

  new Command({
    name: 'level',
    description: 'Check your current level and XP',
    options: [],
    async run(interaction) {

        const user = interaction.member.user;
        const userId = user.id;
      
        // Check if user exists in data
        if (!data[userId]) {
          data[userId] = { xp: 0, level: 1 };
        }
      
        // Calculate current level and XP
        const xp = data[userId].xp;
        const level = data[userId].level;
        const xpNeeded = Math.floor(config.baseXp * Math.pow(config.multiplier, level));
      
        // Create embed message
        const fields = [];
        if (xpNeeded) {
          fields.push({ name: 'XP', value: `${xp} / ${xpNeeded}`, inline: true });
        } else {
          fields.push({ name: 'XP', value: `${xp}`, inline: true });
        }
        fields.push({ name: 'Level', value: level.toString(), inline: true });
      
        const embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s Level`)
          .addFields(fields)
          .setColor('#ff9900');
      
        interaction.reply({
          embeds: [embed],
        });
      
      },      
  }),

];

// Listen for message events
module.exports.events = [

  new Event('messageCreate', async (client, message) => {

    const user = message.author;
    const userId = user.id;

    // Check if user exists in data
    if (!data[userId]) {
      data[userId] = { xp: 0, level: 1 };
    }

    // Calculate XP gain
    const xpGain = Math.floor(Math.random() * (config.maxXp - config.minXp + 1) + config.minXp);
    data[userId].xp += xpGain;

    // Check if user has leveled up
    let level = data[userId].level;
    if (!level || level === '') {
      level = 1;
    }
    const xpNeeded = Math.floor(config.baseXp * Math.pow(config.multiplier, level));
    if (data[userId].xp >= xpNeeded) {
      data[userId].level++;
      message.channel.send(`Congratulations ${user}! You've leveled up to level ${data[userId].level}!`);
    }

    // Save data to JSON file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  }),

];
