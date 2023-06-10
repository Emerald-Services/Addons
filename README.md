<h1 align="center">
    <br>
    <a href="https://github.com/Emerald-Services/SupportBot"><img src="https://i.imgur.com/tzi3d7Q.png"></a>
    <br>
    SupportBot Addons
    <br>
</h1>

Hello Developers!
So I assume you're reading this because you're Developer interested in creating an addon or using an addon created by other developers correct? Well you're in the right place. First of all you'll need to understand and have knowledge with Node/Discord.js. This is what SupportBot is based off.

# List of current addons in this repository.

- [Levels](https://github.com/Emerald-Services/Addons/Levels/README.md)  
- [Polls](https://github.com/Emerald-Services/Addons/Polls/README.md)
- [Stats](https://github.com/Emerald-Services/Addons/Stats/README.md)
- ...


## How to enable the addons?

1. Go to `/Addons/` and import the files from te folder. This means that the `.js` file must be in the `/Addons/` folder. If the addon uses a config, you can import that file in the `/Addons/Configs/` folder.



## Creating your own addon

1. You'll see a directory called `/Addons/` in your version of SupportBot. This is where you're addon will config, and its config folder will be `/Addons/Configs/`.
2. So let's set-up the base for your addon. Head into the `/Addons/` directory and create the file for your addon with the `.js` extension.

Now lets start by requiring the default modules

```js
const fs = require("fs");

const Discord = require("discord.js");
const yaml = require("js-yaml");
const supportbot = yaml.load(
  fs.readFileSync("./Configs/supportbot.yml", "utf8")
);

// If you need to read something from the main config!
const cmdconfig = yaml.load(fs.readFileSync("./Configs/supportbot.yml", "utf8"));

// This is for your Addon Configuration
const config = yaml.load(fs.readFileSync('./Addons/Configs/YourAddonConfig.yml', 'utf8'));

const { Command, Event } = require("../Structures/Addon");
```

Now lets set-up addon handler

```js
module.exports.commands = [

  new Command({
    name: "your-cmd-name",
    description: "your-command-description",
    options: [],
    permissions: ["SEND_MESSAGES"],
    async run(interaction) {

      const Embed = new Discord.MessageEmbed()
        .setDescription("Hello World!")
        .setColor(supportbot.InfoColour);

      interaction.reply({
        embeds: [Embed],
      });

    },
  }),

];
```

**Event Example**

```js
module.exports.events = [

  new Event("ready", async (client) => {
    console.log("Bot started!");
  }), 
];
```


If you want, you can always share your own addon by creating a pull request to this rep.
