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
		ExchangeRatesToCAD: []
	},
	created() {
		this.GetWallets().then(function(value){
			console.log(value);
		})
	},
	computed: {
		
	},
	methods: {
		Wallet: (currency, amount, changeToday) => {
			this.currency = currency;
			this.amount = amount;
			this.changeToday = changeToday; 
		},
		ExchangeRate: (currency, rate) => {
			this.currency = currency;
			this.rate = rate;
		},
		GetWallets: () => {
			console.log(this)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() < 0.2) {
						reject("Could not connect to server");
						return;
					}
					resolve([
						{obj: this.Wallet("BTC", 0.5001, 1000.77)},
						{obj: this.Wallet("ETH", 1.2211, -213.40)},
						{obj: this.Wallet("LTC", 105.3177, 0)},
						{obj: this.Wallet("XMR", 1, 0.48)}
					]);
				}, 250);
			});
		}
	}	
})
