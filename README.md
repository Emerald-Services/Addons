<h1 align="center">
    <br>
    <a href="https://github.com/Emerald-Services/SupportBot"><img src="https://i.imgur.com/cuadAYv.png"></a>
    <br>
    SupportBot Addons
    <br>
</h1>

Hello Developers!
So I assume you're reading this because you're Developer interested in creating an addon or using an addon created by other developers correct? Well you're in the right place. First of all you'll need to understand and have knowledge with Node/Discord.js. This is what SupportBot is based off.

# List of current addons in this repository.
| Name | V7 | V8 |
| ---- | --- | --- |
| [Levels](https://github.com/Emerald-Services/Addons/blob/main/Levels/README.md)  | ✅ | ❌ |
| [Polls](https://github.com/Emerald-Services/Addons/blob/main/Polls/README.md) | ✅ | ❌ |
| [Stats](https://github.com/Emerald-Services/Addons/blob/main/Stats/README.md) | ✅ | ❌ |
| [Reload](https://github.com/Emerald-Services/Addons/blob/main/Reload/README.md) | ✅ | ❌ |

# Other Addons:
We have created a marketplace where people can upload there addons with ease, you can find it [here](https://community.emeraldsrv.com/)



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
module.exports = new Command({
    name: "addon",
    description: "This is a sample addon!",
    options: [],
    permissions: ["Administrator"],
  
    async run(interaction) {
      let disableCommand = true;
  
      const PingEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `This is a sample addon.\n\nPong! \`${interaction.client.ws.ping} ms\``
        )
        .setColor(supportbot.Embed.Colours.General);
  
      interaction.reply({
        embeds: [PingEmbed],
      });
    },
  });
```

If you want, you can always share your own addon by creating a pull request to this rep.
