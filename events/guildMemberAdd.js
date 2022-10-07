module.exports = async (client, member) => {
    
    const newGuildMember = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
      };
    
      await client.createUser(newGuildMember);
}