// discordライブラリから必要な設定を呼び出し保存する
//変数の宣言を行う
//const　変数の宣言、一度代入すると再度代入することは不可　変数の値を変更されてはいけない場合、誤って上書きしてしまわないように指定する
//最初にconstで初期値を代入しなければならない
//;は終了を意味する　1つの文が終了し次の分が始まることを示している。JSは改行又は特定条件で文の終了を自動で判断する；を使用することで文の終了を明確化することができる。
const { Client, Events, GatewayIntentBits, InteractionCollector } = require('discord.js');
//const { SlashCommandBuilder } = require("discord.js");
const { REST, Routes } = require('discord.js');
// 設定ファイルからtoken情報呼び出し、変数に変換
//const { token } = require('./config.json');
const { applicationId, guildId, token } = require('./config.json');
// DiscordのAPIには現在最新のversion10を指定
const rest = new REST({ version: '10' }).setToken(token);
// //heyfileを定義する
// const heyFile = require(`./commands/hey`)

// //hellofileを定義する
// const helloFile = require(`./commands/hello`)
async function setslash(commands2) {
    let data = []
    return new Promise(async (resolve, reject) => {
        commands2.forEach(element => {
            data.push({
                name: element,
                description: 'あいさつに反応してbotが返事します'
            })
        });
        try {
            console.log("コマンド登録中")
            await rest.put(
                Routes.applicationGuildCommands(applicationId, guildId),
                { body: data },
            );
            console.log('サーバー固有のコマンドが登録されました！');
            resolve();
        } catch (error) {
            console.error('コマンドの登録中にエラーが発生しました:', error);
            reject();
        }



    })


}
/**
 * @param command 受け付けるコマンド
 */
const command = {
    hey: "fuck",
    hello: "しね",
    fuck: "???"
}
async function main() {
    const commandkey = Object.keys(command);

    await setslash(commandkey)

    //クライアントインスタンスというオブジェクトを作成します
    //clientはdiscordのクライアントを示す変数でEvents.ClientReadyイベントを待機しているEvents.ClientReady イベントは、ボットがDiscordにログインし、サーバーとの接続が確立されたときにトリガーされる。
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    //クライアントオブジェクトが準備がOKになったとき1度だけ実行される
    client.once(Events.ClientReady, c => {
        console.log(`準備OKです ${c.user.tag}が待機しています。`);
    });


    async function senddiscord(interaction, word) {
        await interaction.reply(word);
    };

    //スラッシュコマンドをに応答するにはinteractionCreateのベントリスナーを使う必要がある。
    client.on(Events.InteractionCreate, async interaction => {

        //スラッシュ以外のコマンドの場合対象外なので早期リターンさせて終了させる
        //コマンドにスラッシュが使われているかisChatInputCommand()で判断させる
        if (!interaction.isChatInputCommand()) return;

        // heyコマンドに対する処理
        if (command[interaction.commandName] != undefined) {

            try {
                await senddiscord(interaction, command[interaction.commandName]);

            } catch (error) {

                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
                }
            }

        } else {
            console.error(`${interaction.commandName}というコマンドには対応していません。`);
        }
    });



    // ログインします
    client.login(token);
}
main();