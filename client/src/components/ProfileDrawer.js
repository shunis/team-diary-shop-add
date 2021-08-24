import React, { useState } from "react";
import "antd/dist/antd.css";
import { Divider, Col, Row, Button } from "antd";
import axios from "axios";

import "../assets/css/profileDrawer.css";
import { USER_SERVER } from "../templates/Config";

function ProfileDrawer(props) {
  const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then((response) => {
			if (response.status === 200) {
				window.localStorage.setItem('userId', '')
				props.history.push('/login')
			} else {
				alert ('Logout Failed....!')
			}
		})
	};

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

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
          <DescriptionItem title="name" content="test-name" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="email" content="test@peoplelife.co.kr" />
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
      <Button danger>Logout</Button>
    </div>
  );
}

export default ProfileDrawer;
