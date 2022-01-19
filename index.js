const {Discord, Intents, Client, Message, GuildMember, MessageReaction} = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('./config.json');
const prefix = '/';
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

const Ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping un utilisateur')
    .addUserOption(option => option
        .setName('utilisateur')
        .setDescription('Utilisateur que vous souhaitez mentionner')
        .setRequired(true))

const Age = new SlashCommandBuilder()
    .setName('age')
    .setDescription('veuillez entrer votre date de naissance sous forme MM/JJ/AAAA')
    .addStringOption(option => option
        .setName('input')
        .setDescription('entrer date au format : MM/JJ/AAAA')
        .setRequired(true)
        
        )

client.on('ready', async () => {
    client.guilds.cache.get('926159570479509585').commands.create(Ping);
    client.guilds.cache.get('926159570479509585').commands.create(Age);

    await client.guilds.cache.get('926159570479509585').commands.fetch();
    console.log('[TaupeAss] IS NOW [On]')
});



client.on('messageCreate', msg => {
    if(msg.content.startsWith('Vous êtes majeur voici votre rôle =>')){
        msg.react('933089033482022974')
    }
});

client.on('messageReactionAdd',(reaction, user) => {

    if(user.bot) return;

    console.log('1');
        if(reaction.emoji.id === '933089033482022974'){
            console.log('2');
            
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            const Role1 = reaction.message.guild.roles.cache.get("926249281113952346");
            member.roles.add(Role1);
            console.log('role ajouté');
        }
    
});

client.on('MessageReactionRemove', ( reaction, user) => {
    if(user.bot) return;

});


client.on('interactionCreate', interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === 'ping'){
            let user = interaction.options.getUser('utilisateur');
            if(user != undefined){
                interaction.reply('<@'+user.id + '> Veuillez utiliser la commande _/age MM/JJ/AAAA_ pour confirmer votre age et obtenir votre rôle')
            }
        }
        if(interaction.commandName === 'age'){
            var Naissance =new Date(interaction.options.getString('input'));
            var NaissanceAnnee = Naissance.getFullYear();
            var NaissanceMois = Naissance.getMonth();
            var NaissanceJour = Naissance.getDay();

            var aujourdhui = new Date();
            var Annee = aujourdhui.getFullYear();
            var Mois = aujourdhui.getMonth();
            var Jour = aujourdhui.getDay();

            if((Annee - NaissanceAnnee) >= 18){
                if((Mois <= NaissanceMois)){
                    if((Jour >= NaissanceJour )){
                        interaction.reply('Vous êtes majeur voici votre rôle =>');
                    }
                    else {
                        interaction.reply('Plus que quelques jours... soit patient ;P')
                    }
                } else {
                    interaction.reply('Il te manque encore quelques mois :/ reviens plus tard :P')
                }
            }else {
                interaction.reply("Aie Aie Aie :/ tu est loin d'être majeur ! attend encore un peu :)")
            }
        }


            }
    });
client.login(config.token);
