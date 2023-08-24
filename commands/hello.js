//SlashCommandBuilderという部品をdiscord.jsから引っ張ってくる
//これによりスラッシュコマンドを使用できる
const { SlashCommandBuilder } = require("discord.js");

//以下の形式にすると他ファイルをインポートし、使用できるようになる

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('あいさつに反応してbotが罵倒します'),
	execute: async function(interaction) {
		await interaction.reply('しね');
	},

};