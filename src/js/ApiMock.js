// Filter to format currency
Vue.filter('toCurrency', function (value) {
	if (typeof value !== "number") {
		return value;
	}
	let currencyValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(value)
	return currencyValue.replace('A', '')
});

let symetria = new Vue({
	el: '#wallet',
	data: {
		title: 'Your Portifolio',
		port: 'Portifolio Value',
		exchangeRatesToCAD: [
			{currency: "BTC", rate: 10100},
			{currency: "XMR", rate: 320.45},
			{currency: "LTC", rate: 241.4},
			{currency: "DOGE", rate: 0.00041},
			{currency: "ETH", rate: 500.12717}
		],
		exchangeWallet: [],
		currencyConverted: [],
		show: false,
		error: false,
		errorMessage: ''
	},

	computed: {
		portifolioTotal() { //calculate the total currency converted to CAD
			let portTotal = this.exchangeWallet.reduce((prev, curr) => {
				return prev + curr.convertedToCad
			}, 0)// starting value at 0
			return portTotal
			
		},
		fluctuationTotal() { //calculate the total fluctuation of the currency
			let flucTotal = this.exchangeWallet.reduce((prev, curr) => {
				return prev + curr.changeToday
			}, 0)// starting value at 0
			return flucTotal
		}
	},
	
	created() {
		this.getWallets()
			.then((wallets) => { //return the resolve of promise
				let updatedWallet = wallets.map(eachWallet => { //create a new array to hold all wallets  + converted rate
					// vai quebrar cada exchange e pegar so o rate
					let { rate } = this.exchangeRatesToCAD.find(exchange => exchange.currency === eachWallet.currency) //find and get exchange rate
					
					let walletTotal = eachWallet.amount * rate //calculate the total converted

					return { //return the new object with each wallet and total converted to CAD
						...eachWallet,
						convertedToCad: walletTotal
					}
				})

				this.exchangeWallet = updatedWallet
			})
			.catch(err => { //display the error msg if server not respond
				this.error = true
				this.errorMessage = err
			})			
	},
	
	methods: {
		createWallet (currency, amount, changeToday) {
			return {
				currency,
				amount,
				changeToday
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
