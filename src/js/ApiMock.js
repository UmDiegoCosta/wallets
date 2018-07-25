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
		error: false
	},

	computed: {
		portifolioTotal() {
			let portTotal = this.exchangeWallet.reduce((prev, curr) => {
				return prev + curr.total
			}, 0)
			return portTotal
			
		},
		fluctuationTotal() {
			let flucTotal = this.exchangeWallet.reduce((prev, curr) => {
				return prev + curr.changeToday
			}, 0)

			return flucTotal
		}
	},
	
	created() {
		this.getWallets()
			.then((wallets) => {
				//criar um novo array com todos as wallets
				let updatedWallet = wallets.map(eachWallet => {
					// vai quebrar cada exchange e pegar so o rate
					let { rate } = this.exchangeRatesToCAD.find(exchange => exchange.currency === eachWallet.currency)
					//calcula o total
					let walletTotal = eachWallet.amount * rate

					return {
						//devolve um objeto novo com eachwallet + total, pra poder mostrar no for.
						...eachWallet,
						total: walletTotal
					}
				})

				this.exchangeWallet = updatedWallet
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
