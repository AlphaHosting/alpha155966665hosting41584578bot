const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ('!');

client.on("ready", () => {
    client.user.setActivity("AlphaHosting");
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

console.log('Bot Is Ready');


client.on('message' message => {
if(message.content === ".bot")
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setFooter('Quran Bot')
.addField('Owned By : BlackFire')
.addField('Servers : [${client.guild.size}]')
.addField('Users : [${client.users.size}]')
.addField('Channels : [${client.channels.size}]')
.addField('Prefix : [.]')
.addField('ID : [client.user.id]')
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
