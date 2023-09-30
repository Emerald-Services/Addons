// Reload addon made by TANGAMER

const fs = require("fs");
const yaml = require("js-yaml");
const { Client, Intents } = require('discord.js');
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
client.events = new Map(); // Initialize the events as a Map

// Register event handlers using client.on()
client.on('ready', () => {
  console.log('Bot is ready!');
});

const supportbot = yaml.load(fs.readFileSync("./Configs/supportbot.yml", "utf8"));

const { Command, Event } = require("../Structures/Addon");

module.exports.commands = [
  // Register the /reload command with the options parameter to pass the config object
  new Command({
    name: "reload",
    description: "Reload bot cache",
    options: [],
    permissions: ["SEND_MESSAGES"],
    async run(interaction, config) { // Pass the config object here
      // Retrieve the admin role name or ID from the configuration
      const adminRoleNameOrID = supportbot.admin;

      // Check if the user invoking the command has the admin role
      const member = interaction.guild.members.cache.get(interaction.user.id);
      if (!member.roles.cache.some((role) => role.name === adminRoleNameOrID || role.id === adminRoleNameOrID)) {
        return interaction.reply({
          content: "You don't have permission to use this command.",
          ephemeral: true, // Make the response ephemeral (only visible to the user who ran the command)
        });
      }

      // Clear the cache (assuming your bot is named 'client')
      await interaction.client.commands.clear();
      // Manually clear event handlers
      client.removeAllListeners('Event'); // Replace 'event-name' with the actual event name

      // Reload modules when the command is invoked by a user with the admin role
      reloadModules();

      interaction.reply({
        content: "Bot cache cleared and modules reloaded.",
        ephemeral: true,
      });
    },
  }),
];

// Define a function to reload modules
function reloadModules() {

  try {
    // Example: Clear the require cache for the main bot file
    const mainModulePath = require.resolve(require.main.filename);
    delete require.cache[mainModulePath];
    
    // Example: Reinitialize the main bot file
    require(mainModulePath);
    
  } catch (error) {
    console.error('Error reloading modules:', error);
  }
}

module.exports.events = [];
