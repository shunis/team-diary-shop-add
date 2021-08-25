import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Divider, Col, Row, Button, Image, Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

import "../assets/css/profileDrawer.css";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  USER_SERVER,
} from "../templates/Config";

import { LogoutOutlined, UserOutlined, HeartTwoTone } from "@ant-design/icons";

function ProfileDrawer() {
	const profile = useSelector((state) => state.user)

  const [firstFavoriteImage, setFirstFavoriteImage] = useState([]);
	const [visible, setVisible] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal")
	const [confirmLoading, setConfirmLoading] = useState(false);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("userId", "");
        // window.location.href = "/login";
        window.location.reload();
      } else {
        alert("Logout Failed..!");
      }
    });
  };

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&;language=ko-KR&page=1`;
    fetchFavorites(endPoint);
  }, []);

  const fetchFavorites = (endPoint) => {
    fetch(endPoint)
      .then((result) => result.json())
      .then((result) => {
        setFirstFavoriteImage(result.results[0]);
      });
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

	const showModal = () => {
		setVisible(true);
	}

	const handleOk = () => {
		setModalText('The change has been completed. The modal will be closed after three second')
		setConfirmLoading(true)
		setTimeout(() => {
			setVisible(false)
			setConfirmLoading(false)
		}, 3000)
	}

	const handleCancel = () => {
		setVisible(false);
	}

	const withdrawalUser = () => {
		axios.delete(`${USER_SERVER}/user/${profile.userData._id}`).then((response) => {
			if (response.status === 200) {
				window.localStorage.setItem('userId', '')
				window.localStorage.setItem('rememberMe', '')
				window.location.reload()
			} else {
				alert('Failed withdrawal user...!')
			}
		})
	}

  return (
    <div>
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        User profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="email" content="test@peoplelife.co.kr" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="name" content="test-name" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="joinDate" content="2021-08-24" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="birthDay" content="2021-08-24" />
        </Col>
      </Row>

      <Divider />
      <p className="site-description-item-profile-p">Favorite</p>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <Button className="site-description-item-profile-favorite-button" danger icon={<HeartTwoTone twoToneColor="#eb2f96" />}>
        More Favorite Item
      </Button>

      <Divider />
      <Button
        className="site-description-item-profile-button"
        type="primary"
        ghost
        icon={<UserOutlined />}
				onClick={showModal}
      >
        Update Profile
      </Button>
			<Modal title="Update User Profile" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
				<p>{modalText}</p>
				<Button danger onClick={withdrawalUser}>Withdrawal</Button>
			</Modal>
      <Button danger onClick={logoutHandler} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  );
}

export default ProfileDrawer;
