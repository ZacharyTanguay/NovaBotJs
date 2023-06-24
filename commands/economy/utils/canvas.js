const Canvas = require('@napi-rs/canvas');
const { moneyFormat, canvas_applyText, numberWithSpaces } = require("../../../utils/functions.js")

async function canvas_afficherCompteBancaire(canvas, context, background, compteBancaireData) {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.font = canvas_applyText(canvas, 45, 'Calibri', 'Votre solde actuel');
    context.fillStyle = '#ffffff';
    context.fillText('Votre solde actuel', 70, 130);

    context.font = canvas_applyText(canvas, 60, 'Calibri', numberWithSpaces(compteBancaireData.argent_propre + "$"));
    context.fillStyle = '#ffffff';
    context.fillText(numberWithSpaces(compteBancaireData.argent_propre + "$"), 700, 137);

    context.font = canvas_applyText(canvas, 40, 'Calibri', 'Historique de votre compte');
    context.fillStyle = '#454545';
    context.fillText('Historique de votre compte', 70, 210);

    context.font = canvas_applyText(canvas, 40, 'Calibri', 'Historique de votre compte');
    context.fillStyle = '#000000';
    context.fillText('Historique de votre compte', 90, 250);
    return context;
}

module.exports = {
    canvas_afficherCompteBancaire
}