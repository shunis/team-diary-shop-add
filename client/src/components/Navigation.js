import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { USER_SERVER } from "../templates/Config";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import {
  HomeTwoTone,
  HeartTwoTone,
  ShopTwoTone,
  LockTwoTone,
  EditTwoTone,
  UnlockTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function Navigation(props) {
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/");
      } else {
        alert("Logout Failed..!");
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
            <Menu.Item key="All">All NFTs</Menu.Item>
            <Menu.Item key="Art">Art</Menu.Item>
            <Menu.Item key="Sports">Sports</Menu.Item>
            <Menu.Item key="Utility">Utility</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item
          key="Favorite"
          icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        >
          Favorite
        </Menu.Item>
        <Menu.Item key="Logout" icon={<UnlockTwoTone />}>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        <Menu.Item key="Setting" icon={<SettingTwoTone />}>
          Setting
        </Menu.Item>
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
            <Menu.Item key="All">All NFTs</Menu.Item>
            <Menu.Item key="Art">Art</Menu.Item>
            <Menu.Item key="Sports">Sports</Menu.Item>
            <Menu.Item key="Utility">Utility</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="Login" icon={<LockTwoTone />}>
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
