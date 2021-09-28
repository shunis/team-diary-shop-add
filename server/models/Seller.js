const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	userRole: {
		type: String
	},
	userEmail: {
		type: String
	},
	companyName: {
		type: String
	},
	companyAddress: {
		type: String
	}
}, { timestamps: true })

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = { Seller }