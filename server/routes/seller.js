const express = require("express");
const router = express.Router();
const { Seller } = require("../models/Seller");
const { User } = require("../models/User");
const { isValidObjectId } = require("mongoose");

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

// * 판매자 role 변경
router.put("/update-role/:sellerId", async (req, res) => {
	try {
		const { sellerId } = req.params;
		if (!isValidObjectId(sellerId)) return res.status(400).send({ err: "invalid sellerId "});
		const seller = await Seller.findById(sellerId);
		if (seller.userRole === "ROLE_USER") {
			seller.userRole = "ROLE_SELLER";
		} else {
			seller.userRole = "ROLE_USER";
		}
		if (!isValidObjectId(seller.userId)) return res.status(400).send({ err: "invalid userId" });
		const user = await User.findById(seller.userId);
		if (user.role === "ROLE_USER") {
			user.role = "ROLE_SELLER";
		} else {
			user.role = "ROLE_USER";
		}
		await seller.save();
		await user.save();
		return res.send({ success: "Update User Role" });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = router;