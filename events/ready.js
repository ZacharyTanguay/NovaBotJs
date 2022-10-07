module.exports = async (client) => {
    console.log("Le client est connecté à discord en tant que", client.user.tag)

    const commandArgs = process.argv.find(arg => arg.startsWith("local=") || arg === "global")

    if (commandArgs) {
        const commands = [...client.commands].map(x => x[1].data)

        if (commandArgs.startsWith("local=")) {
            await client.guilds.fetch(commandArgs.split("=")[1]).then(async guild => await guild.commands.set(commands))
            return console.log("Les commandes slash ont été déployées sur le serveur")
        } else {
            await client.application.commands.set(commands)
            return console.log("Les commandes ont été définies globalement")
        }
    }
}