module.exports = {
    moneyFormat,
    canvas_applyText,
    numberWithSpaces,
}

function moneyFormat ( number ) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 3,
        minimumSignificantDigits: 3,
      });
    return formatter.format(number)
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function canvas_applyText (canvas, fontSize, police, textToMesure) {
    const context = canvas.getContext('2d');

    do {
        context.font = `${fontSize -= 10}px ${police}`;
    } while (context.measureText(textToMesure).width > canvas.width - 300);

    return context.font;
};