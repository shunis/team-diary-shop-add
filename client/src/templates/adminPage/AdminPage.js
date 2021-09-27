import React, {
	useEffect,
	useState
} from 'react';
import Axios from 'axios';
import {
	Table,
	Modal,
	Select,
	Button,
	message
} from 'antd';
import "../../assets/css/adminPage.css";
import { sellerChangeRole } from '../../_actions/seller_actions';
import axios from 'axios';

const { Column } = Table;

function AdminPage() {
	const [users, setUsers] = useState([]);
	const [sellers, setSellers] = useState([]);
	const [roleUpdateModalVisible, setRoleUpdateModalVisible] = useState(false);

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

	const roleChangeHandler = (sellerId) => {
		axios.put(`${process.env.REACT_APP_SELLER_SERVER}/update-role/${sellerId}`).then((response) => {
			if (response.status === 200) {
				message.success("change role");
			} else {
				message.error("failed change role");
			}
		})
	}

	const showRoleUpdateModal = () => {
		setRoleUpdateModalVisible(true);
	}

	const handleOk = () => {
		setRoleUpdateModalVisible(false);
	}

	const handleCancel = () => {
		setRoleUpdateModalVisible(false);
	}

	const sellerColumns = [{
			title: 'Email',
			dataIndex: 'userEmail',
			key: '1'
		},
		{
			title: 'Name',
			dataIndex: 'userName',
			key: '2'
		},
		{
			title: 'Role',
			dataIndex: 'userRole',
			key: '3'
		},
		{
			title: 'CompanyName',
			dataIndex: 'companyName',
			key: '4'
		},
		{
			title: 'CompanyAddress',
			dataIndex: 'companyAddress',
			key: '5'
		},
		{
			title: 'Action',
			key: '6',
			render: (_, record) => <span>
				<a onClick={showRoleUpdateModal}>change role</a>
				<Modal title="Change Role" visible={roleUpdateModalVisible} onOk={handleOk} onCancel={handleCancel}>
					<Button type="primary"  onClick={roleChangeHandler(record._id)}>change</Button>
				</Modal>
				</span>
		}
	]

	return ( 
		<div className = "admin-page-main">
		<h2>User List</h2>
		 <hr />

		<Table dataSource = {users}>
			<Column title = "Email" dataIndex = "email" key = "email" />
			<Column title = "Name" dataIndex = "name" key = "name" />
			<Column title = "JoinDate" dataIndex = "joinDate" key = "joinDate" />
			<Column title = "Status" dataIndex = "status" key = "status" />
			<Column title = "Role" dataIndex = "role" key = "role" />
		</Table>

		<br />

		<h2>Seller List</h2>
		<hr />
			<Table dataSource = {sellers} columns = {sellerColumns} />
		</div>
	)
}

export default AdminPage
