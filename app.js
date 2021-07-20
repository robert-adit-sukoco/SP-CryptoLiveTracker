// GENERAL FUNCTIONS
const roundNum = (num, n) => {
    let result = Number(num);
    result = result.toFixed(n);
    return result;
}

const getCrypto = async (crypt) => {
    let fetchCryptoPrice = 0;
    try {
        let url = `https://api.cryptonator.com/api/ticker/${crypt}-usd`
        let resBTC = await fetch(url);
        let dataBTC = await resBTC.json();
        
        fetchCryptoPrice = await dataBTC.ticker.price;
        fetchCryptoChange = await dataBTC.ticker.change;
        
        return {price: fetchCryptoPrice, change: fetchCryptoChange}
    } catch (e) {
        console.log('Something.... went wrong....');
    }
}

const updateCryptoPriceDisplay = async (crypt) => {
    let data = await getCrypto(crypt);
    data = roundNum(data.price, 2);
    (document.querySelector(`#${crypt} #price`)).innerText = `USD ${data}`;
}

const updateCryptoChangeDisplay = async (crypt) => {
    let diff = await getCrypto(crypt);
    diff = diff.change;
    (document.querySelector(`#${crypt} #change`)).style.color = diff >= 0 ? "#06d6a0" : "#ef476f";
    (document.querySelector(`#${crypt} #change`)).innerText = `(${diff >= 0 ? "+" : ""}${roundNum(diff, 2)})`;
}

setInterval(() => {
    updateCryptoPriceDisplay('btc');
    updateCryptoChangeDisplay('btc');

    updateCryptoPriceDisplay('eth');
    updateCryptoChangeDisplay('eth');

    updateCryptoPriceDisplay('bnb');
    updateCryptoChangeDisplay('bnb');

    updateCryptoPriceDisplay('etc');
    updateCryptoChangeDisplay('etc');

    updateCryptoPriceDisplay('wbtc');
    updateCryptoChangeDisplay('wbtc');

    updateCryptoPriceDisplay('dcr');
    updateCryptoChangeDisplay('dcr');
}, 1000)



