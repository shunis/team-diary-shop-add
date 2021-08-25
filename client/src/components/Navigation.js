import React, { useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { USER_SERVER } from "../templates/Config";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { Menu, Drawer, message } from "antd";
import {
  HomeTwoTone,
  HeartTwoTone,
  ShopTwoTone,
  EditTwoTone,
  SettingTwoTone,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProfileDrawer from "./ProfileDrawer";

const { SubMenu } = Menu;

function Navigation(props) {
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("userId", "");
        props.history.push("/login");
      } else {
        message.error("Logout Failed..!");
      }
    });
  };

  if (user.userData && user.userData.isAuth === true) {
    return (
      <Menu className="navigation" mode="horizontal">
        <Menu.Item key="Home" icon={<HomeTwoTone />}>
          <a href="/">Home</a>
        </Menu.Item>
        <SubMenu key="Marketplace" icon={<ShopTwoTone />} title="Marketplace">
          <Menu.ItemGroup title="Category">
            <Menu.Item key="All">
              <a href="/marketPlace">All NFTs</a>
            </Menu.Item>
            <Menu.Item key="Art">Art</Menu.Item>
            <Menu.Item key="Sports">Sports</Menu.Item>
            <Menu.Item key="Utility">Utility</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item
          key="Favorite"
          icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        >
          <a href="/favorite">Favorite</a>
        </Menu.Item>
        {/* // TODO Update Required ItemGroup */}
        <SubMenu key="Settings" icon={<SettingTwoTone />} title="Setting">
          <Menu.Item key="Profile" icon={<UserOutlined />}>
            <a onClick={showDrawer}>Profile</a>
            <Drawer width={640} placement="right" onClose={onClose} visible={visible}>
              <ProfileDrawer />
            </Drawer>
          </Menu.Item>
          {/* <Menu.Item key="Logout" icon={<LogoutOutlined />}>
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item> */}
        </SubMenu>
      </Menu>
    );
  } else {
    return (
      <Menu className="navigation" mode="horizontal">
        <Menu.Item key="Home" icon={<HomeTwoTone />}>
          <a href="/">Home</a>
        </Menu.Item>
        <SubMenu key="Marketplace" icon={<ShopTwoTone />} title="Marketplace">
          <Menu.ItemGroup title="Category">
            <Menu.Item key="All">
              <a href="/marketPlace">All NFTs</a>
            </Menu.Item>
            <Menu.Item key="Art">Art</Menu.Item>
            <Menu.Item key="Sports">Sports</Menu.Item>
            <Menu.Item key="Utility">Utility</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="Login" icon={<LoginOutlined />}>
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="Register" icon={<EditTwoTone />}>
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navigation);
