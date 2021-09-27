import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'antd';
import "../../assets/css/adminPage.css";

const { Column }  = Table;

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
		<div className="admin-page-main">
			<h2>User List</h2>
			<hr />

			<Table dataSource={users} rowKey="user">
				<Column title="Email" dataIndex="email" key="email" />
				<Column title="Name" dataIndex="name" key="name" />
				<Column title="JoinDate" dataIndex="joinDate" key="joinDate" />
				<Column title="Status" dataIndex="status" key="status" />
				<Column title="Role" dataIndex="role" key="role" />
			</Table>

			<br />

			<h2>Seller List</h2>
			<hr />
			<Table dataSource={sellers} rowKey="seller">
				<Column title="Email" dataIndex="userEmail" key="userEmail" />
				<Column title="Name" dataIndex="userName" key="userName" />
				<Column title="Role" dataIndex="userRole" key="userRole" />
				<Column title="CompanyName" dataIndex="companyName" key="companyName" />
				<Column title="CompanyAddress" dataIndex="companyAddress" key="companyAddress" />
			</Table>
		</div>
	)
}

export default AdminPage
