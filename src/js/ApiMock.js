// var Wallet = function (currency, amount, changeToday) {
// 	this.currency = currency;
// 	this.amount = amount;
// 	this.changeToday = changeToday;
// }

// var ExchangeRate = function (currency, rate) {
// 	this.currency = currency;
// 	this.rate = rate;
// }

// var ExchangeRatesToCAD = [
// 	new ExchangeRate("BTC", 10100),
// 	new ExchangeRate("XMR", 320.45),
// 	new ExchangeRate("LTC", 241.4), 
// 	new ExchangeRate("DOGE", 0.00041),
// 	new ExchangeRate("ETH", 500.12717)
// ];

// function GetWallets() {
// 	return new Promise(function (resolve, reject) {

// 		setTimeout(function () {

// 			if (Math.random() < 0.2) {
// 				reject("Could not connect to server");
// 				return;
// 			}

// 			resolve([
// 				new Wallet("BTC", 0.5001, 1000.77),
// 				new Wallet("ETH", 1.2211, -213.40),
// 				new Wallet("LTC", 105.3177, 0),
// 				new Wallet("XMR", 1, 0.48)
// 			]);
// 		}, 250);
// 	});
// }

// GetWallets().then(function(value){
// 	var walletsResults = value;
// 	//console.log(walletsResults);
// })

// VUE
let symetria = new Vue({
	el: '#wallet',

	data: {
		title: 'Your Portifolio',
		port: 'Portifolio Value',
		exchangeRatesToCAD: [],
		exchangeWallet: [],
		currencyConverted: [],
		totalConverted: 0,
		show: false,
		error: false
	},
	
	created() {
		this.getWallets()
			.then((wallets) => {
				//console.log(wallets)
				this.exchangeWallet = wallets
				exchangeRatesToCAD = [
					this.exchangeRate("BTC", 10100),
					this.exchangeRate("XMR", 320.45),
					this.exchangeRate("LTC", 241.4), 
					this.exchangeRate("DOGE", 0.00041),
					this.exchangeRate("ETH", 500.12717)
				]
				console.log(exchangeRatesToCAD)

			})
			.catch(err => this.error = err)
		
	},
	
	methods: {
		createWallet (currency, amount, changeToday) {
			return {
				currency,
				amount,
				changeToday
			}
		},

		convertCurrency () {
			//have to exchangeWallet the wallet currency with exchangeRatesToCAD currency and
			//	multiply the exchangeWallet.amount by exchangeRatesToCAD.rate

			for(let i = 0; i < this.exchangeWallet.length; i++){
				for(let x = 0; x < exchangeRatesToCAD.length; x++){
					if(this.exchangeWallet[i].currency === this.exchangeRatesToCAD[x].currency){
						//console.log(this.exchangeWallet[i].currency)
					}
				}				
			}
		},

		exchangeRate (currency, rate) {
			return {
				currency,
				rate
			}
		},
		
		getWallets () {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() < 0.2) {
						reject("Could not connect to server");
						return;
					}
					resolve([
						this.createWallet("BTC", 0.5001, 1000.77),
						this.createWallet("ETH", 1.2211, -213.40),
						this.createWallet("LTC", 105.3177, 0),
						this.createWallet("XMR", 1, 0.48),
					]);
				}, 250);
			});
		}
	}	
})
