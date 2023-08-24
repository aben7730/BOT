//SlashCommandBuilderという部品をdiscord.jsから引っ張ってくる
//これによりスラッシュコマンドを使用できる
const { SlashCommandBuilder } = require("discord.js");

//以下の形式にすると他ファイルをインポートし、使用できるようになる

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hey')
		.setDescription('あいさつに反応してbotが返事します'),
	execute: async function(interaction) {
		await interaction.reply('Fuck.');
	},

};
