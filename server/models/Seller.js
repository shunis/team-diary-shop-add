const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = mongoose.Schema({
	userFrom: {
		type: Schema.Types.ObjectId,
		ref: 'User'
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