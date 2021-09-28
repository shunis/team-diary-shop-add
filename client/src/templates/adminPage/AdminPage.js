import React, {	useEffect, useState } from 'react';
import Axios from 'axios';
import { dateFormat } from '../../components/ParseData'
import "../../assets/css/adminPage.css";

function AdminPage() {
	const [users, setUsers] = useState([]);
	const [sellers, setSellers] = useState([]);

	useEffect(() => {
		fetchUsers();
		fetchSellers();
	}, []);

	const fetchUsers = () => {
		Axios.get(`${process.env.REACT_APP_USER_SERVER}user`)
			.then((response) => {
				setUsers(response.data.users)
			})
	}

	const fetchSellers = () => {
		Axios.get(`${process.env.REACT_APP_SELLER_SERVER}seller`)
			.then((response) => {
				setSellers(response.data.sellers)
			})
	}

	return ( 
		<div className = "admin-page-main">
		<h2>User List</h2>
		<hr />
		<table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Name</th>
					<th>JoinDate</th>
					<th>Status</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{users && users.map(item => (
					<tr key={"user_" + item._id}>
							<td>{item.email}</td>
							<td>{item.name}</td>
							<td>{dateFormat(item.joinDate, "YYYY-MM-DD")}</td>
							<td>{item.status}</td>
							<td>{item.role}</td>
					</tr>
				))}
				</tbody>
		</table>

		<br />

		<h2>Seller List</h2>
		<hr />
		<table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Name</th>
					<th>Role</th>
					<th>CompanyName</th>
					<th>CompanyAddress</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{sellers && sellers.map(seller=> (
					<tr key={"seller_" + seller._id}>
						<td>{seller.userEmail}</td>
						<td>{seller.userName}</td>
						<td>{seller.userRole}</td>
						<td>{seller.companyName}</td>
						<td>{seller.companyAddress}</td>
						<td>change role</td>
					</tr>
					))}
			</tbody>
		</table>
		</div>
	)
}

export default AdminPage
