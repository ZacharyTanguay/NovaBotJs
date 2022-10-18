module.exports = {
    moneyFormat
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
