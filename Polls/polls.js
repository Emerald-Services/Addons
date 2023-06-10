const Discord = require('discord.js');
const { Command } = require('../Structures/Addon');

module.exports.commands = [
  new Command({
    name: 'poll',
    description: 'Create a poll with reactions',
    options: [
      {
        name: 'question',
        description: 'The question to ask in the poll',
        type: 'STRING',
        required: true,
      },
      {
        name: 'options',
        description: 'The comma-separated options for the poll',
        type: 'STRING',
        required: true,
      },
    ],
    permissions: ['SEND_MESSAGES'],
    async run(interaction) {
      const question = interaction.options.getString('question');
      const options = interaction.options.getString('options').split(',');

      const Embed = new Discord.MessageEmbed()
        .setTitle('Poll')
        .setDescription(question)
        .setColor('RANDOM');

      const fields = options.map((option, index) => {
        return {
          name: `Option ${index + 1}`,
          value: option.trim(),
          inline: true,
        };
      });

      Embed.addFields(fields);

      const pollMessage = await interaction.reply({
        embeds: [Embed],
        fetchReply: true,
      });

      for (let i = 0; i < options.length; i++) {
        await pollMessage.react(`${i + 1}\u20E3`);
      }
    },
  }),
];
