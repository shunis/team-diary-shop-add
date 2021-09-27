const express = require("express");
const router = express.Router();
const { Seller } = require("../models/Seller");
const async = require("async");

// * 판매자 리스트
router.get("/seller", async (req, res) => {
	try {
		const sellers = await Seller.find({});
		return res.send({ sellers: sellers });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

// * 판매자 자격 신청
router.post("/request-seller", (req, res) => {
	const seller = new Seller(req.body);
	seller.save((err, doc) => {
		if (err) return res.status(400).send(err);
		return res.status(200).json({ success: true, seller });
	});
});

module.exports = router;