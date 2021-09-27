import axios from "axios";
import {
	REQUEST_SELLER
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