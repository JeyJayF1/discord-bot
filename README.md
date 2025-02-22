<h1 align="center">Welcome to Jasons Discord Bot
<img src="https://img.icons8.com/?size=100&id=30998&format=png&color=000000" alt="" width="50" height="50" align="center">

<a href="https://github.com/NamVr/DiscordBot-Template/graphs/commit-activity" target="_blank"></a>
<img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
<img alt="Version" src="https://img.shields.io/badge/version-v0.1-blue.svg?cacheSeconds=2592000" />
</h1>


<br><br>
# Overview

<p style="text-align: justify">
This discord bot is a open-source, work-in-process utility bot. It is based on discord.js and as of now acts more like a template than a fully 
functional bot.The bot supports a few SlashCommands for utility and fun.
The bot also supports connection to a locally hosted LLM and allows the users to write prompts.
</p>

### Features:
#### • Command Handler:
- Group your Commands in the commands directory for easy management
- Sample Commands that can be the basis for all other Slashcommands (e.g `ping.js`)

#### • Event Handler:
- Group your events in the events directory for easy management

#### • Deploy-Commands:
- The `delpoy-commands.js` is used for deploying newly created commands to the discord bot
- Already delpoyed commands can be reloaded using the reload SlashCommand (no bot restart necessary)

#### • LLM-Integration: (see [Ollama](https://github.com/ollama/ollama/tree/main) tutorial)
- Allows a locally hosted LLM to be integrated into the discord bot
- In the [`queue.js`] there is a instance variable `LLM_MODEL` where you can specify your locally running LLM (default: deepseek-r1:7b)
- Using the prompt SlashCommand creates a new Thread for every usage of the command
- Queue allows for multiple Threads to be running concurrently (can be specified in the `CONCURRENT_QUEUE_SIZE` instance variable)
- <b>Work in Progress:</b> Allow multiple conversations in one Thread

### Installation:
1. Clone this repository.
 ```sh
 git clone https://github.com/JeyJayF1/discord-bot.git
 ```
2. Install all dependencies.
```sh
 npm install
 ```
3. Input all required Tokens for your Discord Bot in the `config-example.json` and rename the file to `config.json`.
 > You find the bot token and id here: https://discord.com/developers/applications and the guildId by right-clicking on your servers name
4. Start the bot.
```sh
npm start
```

### Planned Features:
- [ ] Visualizations of User statistic (e.g graphs, charts, ...)
- [ ] Leveling system for severs and bot
- [ ] Full user managment tool-kit (e.g banning/kicking)
- [ ] Trivia/Quiz functionality

### Contributions
Contributions, bug-fixes and new feature ideas are always welcomed!
