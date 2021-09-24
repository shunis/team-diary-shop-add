import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'antd';
import "../../assets/css/adminPage.css";

const { Column }  = Table;

function AdminPage() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = () => {
		Axios.get(`${process.env.REACT_APP_USER_SERVER}/user`)
		.then((response) => {
			setUsers(response.data.users)
		})
	}

	return (
		<div className="admin-page-main">
			<h2>Admin Page</h2>
			<hr />

			<Table dataSource={users}>
				<Column title="Email" dataIndex="email" key="email" />
				<Column title="Name" dataIndex="name" key="name" />
				<Column title="JoinDate" dataIndex="joinDate" key="joinDate" />
				<Column title="Status" dataIndex="status" key="status" />
				<Column title="Role" dataIndex="role" key="role" />
			</Table>
		</div>
	)
}

export default AdminPage
