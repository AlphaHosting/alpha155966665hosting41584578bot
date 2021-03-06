const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ('!');

client.on("ready", () => {
    client.user.setActivity("AlphaHosting");
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

console.log('Bot Is Ready');



client.on('message', message => {
  if(!message.channel.guild) return;
if(message.content.startsWith('!bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let copy = "AlphaHosting";
let request = `Requested By ${message.author.username}`;
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Broadcast')
.addField('Server', message.guild.name)
.addField('Sender', message.author.username)
.addField('Message', args)
.setThumbnail(message.author.avatarURL)
.setFooter(copy, client.user.avatarURL);
m.send({ embed: bc })
msg.delete();
})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});


client.on("message", message => {
	var prefix = "!";
 if (message.content === "!buy") {
  const embed = new Discord.RichEmbed() 
      .setColor("#000000")
	  .setFooter('AlphaHosting')
	  .setThumbnail('https://images-ext-2.discordapp.net/external/EtUkN85E5NK9jYDnsm5SRFd88hIJgcnUkId8nU6ISfE/https/media.discordapp.net/attachments/348582324947910656/484529617164828674/TS2.png')
      .setDescription(`
                 __** TeamSpeak Servers**__ 

				  10 slots+Anti DDos               =      15DH
                  20 slots+AntiDDos                =      25DH
                  50 slots+AntiDDos+Banner         =      50DH
 
                __**  Domains Website **__

				.tk = 10DH            .cf = 10DH
				.ml = 10DH            .ga = 10DH
									
	               __**Discord Bot : Soon**__

      ***Payements Method  : Paypal / Credits Probot / recharge***

	  
	          -+- Website : [ alphahosting.ga ] -+-
	  -+-Discord : [ https://discord.gg/J9U7qXF ]-+-
	  
	  For Pay Contact <@341343814415286272> | <@348555232529219585>
 `)
 message.channel.sendEmbed(embed)
 };
 });



client.on("message", (message) => {
    // Ping Command
    // New ticket command
    if (message.content.startsWith('!new')) {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Support Staff")) return message.channel.send(`This server doesn't have a \`Support Staff\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console
    }

    // Close ticket command
    if (message.content.startsWith('!close')) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        // Confirm delete - with timeout (Not command)
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`!confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '!confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 10000);
                    });
            });
    }

});
 

client.login(process.env.BOT_TOKEN);
