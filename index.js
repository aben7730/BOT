// discordライブラリから必要な設定を呼び出し保存する
//変数の宣言を行う
//const　変数の宣言、一度代入すると再度代入することは不可　変数の値を変更されてはいけない場合、誤って上書きしてしまわないように指定する
//最初にconstで初期値を代入しなければならない
//;は終了を意味する　1つの文が終了し次の分が始まることを示している。JSは改行又は特定条件で文の終了を自動で判断する；を使用することで文の終了を明確化することができる。
const { Client, Events, GatewayIntentBits, InteractionCollector } = require('discord.js');

// 設定ファイルからtoken情報呼び出し、変数に変換
const { token } = require('./config.json');

//heyfileを定義する
const heyFile = require(`./commands/hey`)

//hellofileを定義する
const helloFile = require(`./commands/hello`)

//クライアントインスタンスというオブジェクトを作成します
//clientはdiscordのクライアントを示す変数でEvents.ClientReadyイベントを待機しているEvents.ClientReady イベントは、ボットがDiscordにログインし、サーバーとの接続が確立されたときにトリガーされる。
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//クライアントオブジェクトが準備がOKになったとき1度だけ実行される
client.once(Events.ClientReady, c => {
	console.log(`準備OKです ${c.user.tag}が待機しています。`);
});



//スラッシュコマンドをに応答するにはinteractionCreateのベントリスナーを使う必要がある。
client.on(Events.InteractionCreate, async interaction => {

    //スラッシュ以外のコマンドの場合対象外なので早期リターンさせて終了させる
    //コマンドにスラッシュが使われているかisChatInputCommand()で判断させる
    if(!interaction.isChatInputCommand())return;

   // heyコマンドに対する処理
    if (interaction.commandName === heyFile.data.name) {
        try {
            await heyFile.execute(interaction);
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