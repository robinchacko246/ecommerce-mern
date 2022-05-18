
exports.payment = async (req, res, next) => {
	try {
		const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		console.log(req.body);
		stripe.charges.create(
			{
				source: req.body.data.tokenId,
				amount: req.body.data.amount,
				currency: 'inr',
			},
			(error, stripe) => {
				if (error) {
					console.log(error);
					const err = new Error(error.error)
					err.statusCode = 500
					return next(err)
				} else {
					res.status(200).json({ stripe })
				}
			}
		)
	} catch (error) {
		console.log(error);
		next(error)
	}
}
