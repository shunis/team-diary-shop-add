import axios from "axios";
import {
	REQUEST_SELLER,
	SELLER_CHANGE_ROLE
} from "./types";

export function requestSeller(dataToSubmit) {
	const request = axios
		.post(`${process.env.REACT_APP_SELLER_SERVER}request-seller`, dataToSubmit)
		.then((response) => response.data);

	return {
		type: REQUEST_SELLER,
		payload: request,
	};
}

export function sellerChangeRole(sellerId) {
	const sellerRole = axios
	.put(`${process.env.REACT_APP_SELLER_SERVER}update-role/${sellerId}`).then(
		(response) => response.data);
	return {
		type: SELLER_CHANGE_ROLE,
		payload: sellerRole
	};
}